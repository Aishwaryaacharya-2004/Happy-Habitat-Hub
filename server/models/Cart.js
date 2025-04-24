// A simple “cart item” sub‑schema
const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
  qty : { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: "Lover", unique: true },
  items: [CartItemSchema],
});

module.exports = mongoose.model("Cart", CartSchema);
