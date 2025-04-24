const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  imageUrl: String,
  description: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Lover" },
  uploadedAt: Date,
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model("Pet", petSchema);
