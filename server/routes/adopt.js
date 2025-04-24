// 📁 routes/adoptionRoute.js
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, petType, location, message } = req.body;

  try {
    if (!name || !email || !petType || !location) {
      return res.status(400).json({ error: "Please fill all required fields." });
    }

    console.log(`📨 Received adoption request for ${petType} at ${location}`);

    // 1️⃣ Get latitude and longitude from OpenStreetMap (Nominatim)
    const geoResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: location,
        format: "json",
        limit: 1,
      },
    });

    if (!geoResponse.data.length) {
      return res.status(404).json({ error: "Invalid location!" });
    }

    const lat = parseFloat(geoResponse.data[0].lat);
    const lon = parseFloat(geoResponse.data[0].lon);

    console.log(`📍 Location coordinates: Latitude = ${lat}, Longitude = ${lon}`);

    // 2️⃣ Use Overpass API to get nearby pet shops
    const queryEncoded = `
      [out:json];
      (
        node["shop"="pet"](around:5000,${lat},${lon});
        way["shop"="pet"](around:5000,${lat},${lon});
        relation["shop"="pet"](around:5000,${lat},${lon});
      );
      out center;
    `;

    const overpassResponse = await axios.get("https://overpass-api.de/api/interpreter", {
      params: {
        data: queryEncoded,
      },
    });

    const elements = overpassResponse.data.elements;

    if (!elements || elements.length === 0) {
      return res.status(404).json({ error: "No nearby pet stores found." });
    }

    console.log(`✅ Found ${elements.length} nearby pet shops`);

    // 3️⃣ Prepare email content
    let emailContent = `<h2>🐾 Nearby Pet Shops</h2><hr/>`;
    elements.forEach((el) => {
      const shopName = el.tags && el.tags.name ? el.tags.name : "Unnamed Pet Shop";
      const elLat = el.lat || el.center?.lat;
      const elLon = el.lon || el.center?.lon;
      emailContent += `
        <p><b>Name:</b> ${shopName}</p>
        <p><a href="https://www.openstreetmap.org/?mlat=${elLat}&mlon=${elLon}" target="_blank">📍 View on Map</a></p>
        <br/>
      `;
    });

    // 4️⃣ Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    

    await transporter.sendMail({
      from: `"PetHub 🐾" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🐶 Nearby Pet Stores for Adoption",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for your interest in adopting a <b>${petType}</b>.</p>
        <p>Here are some nearby pet shops around <b>${location}</b>:</p>
        ${emailContent}
        <hr/>
        ${message ? `<p><b>Message:</b> ${message}</p>` : ""}
        <p>Happy Adopting! 🐕🐈</p>
      `,
    });

    res.status(200).json({ message: "Email sent successfully!", shops: elements });

  } catch (error) {
    console.error("🐛 Adoption Error:", error.message);
    res.status(500).json({ error: "Server error during adoption request." });
  }
});

module.exports = router;
