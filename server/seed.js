require("dotenv").config();
const mongoose = require("mongoose");
const Food = require("./models/Food"); // Ensure the correct path to your Food model

const foods = [
  {
    name: "Premium Dog Food",
    price: 500,
    imageUrl: "uploads/Petfood1.jpg",
  },
  {
    name: "Exclusive Dog Treats",
    price: 350,
    imageUrl: "uploads/Petfood2.jpg",
  },
  {
    name: "Classic Dog Food",
    price: 250,
    imageUrl: "uploads/Petfood3.jpg",
  },
  {
    name: "Gourmet Dog Cuisine",
    price: 450,
    imageUrl: "uploads/Petfood4.jpg",
  },
  {
    name: "Nutri Feed",
    price: 400,
    imageUrl: "uploads/Petfood5.jpg",
  },
  {
    name: "Pet Special Feed Mix",
    price: 450,
    imageUrl: "uploads/Petfood6.jpg",
  },
  {
    name: "All-in-One Pet Meal Pack",
    price: 550,
    imageUrl: "uploads/Petfood7.jpg",
  },
];


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");
    
    // Clear existing data (optional)
    await Food.deleteMany({});
    console.log("Old data removed");

    // Insert new data
    await Food.insertMany(foods);
    console.log("Food items seeded");

    // Close connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
