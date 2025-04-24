// 📁 models/PetStore.js
const mongoose = require("mongoose");

const petStoreSchema = new mongoose.Schema({
  name: String,
  petsAvailable: String,
  location: { 
    type: { type: String, enum: ['Point'] }, 
    coordinates: [Number], // [longitude, latitude]
  },
  image: String,
});

// Add a geospatial index to the lat/lon fields
petStoreSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("PetStore", petStoreSchema);
