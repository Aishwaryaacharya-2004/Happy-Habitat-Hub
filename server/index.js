require("dotenv").config();
const express = require("express");
//const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const petRoutes = require("./routes/petRoutes");
const foodRoutes = require("./routes/foodRoutes");
const adoptRoutes=require("./routes/adopt");
const connectDB = require("./config/db");


const app = express();
connectDB();

// Middleware
app.use(express.json());
//app.use(cors());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/adopt",adoptRoutes);
//app.use("/api/food", require("./routes/foodRoute"));
app.use("/api/cart", require("./routes/cart"));   // ⬅️ NEW



const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




