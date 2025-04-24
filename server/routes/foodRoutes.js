const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

// Get all food items
router.get("/", async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json(foodItems);  // Return a 200 status code for success
  } catch (err) {
    console.error(err);  // Log the error for debugging purposes
    res.status(500).json({ message: "Server Error" });  // Return a 500 status code for server errors
  }
});

module.exports = router;
