/* ─────────────────────── cart.js (server) ─────────────────────── */
const express = require("express");
const Cart     = require("../models/Cart");
const Food     = require("../models/Food");
const auth     = require("../middleware/authMiddleware");

const router = express.Router();

/* ────────── ADD (or increment) ITEM ────────── */
router.post("/add/:foodId", auth, async (req, res) => {
  const { foodId } = req.params;
  const userId     = req.user.id;

  const food = await Food.findById(foodId);
  if (!food) return res.status(404).json({ message: "Food not found" });

  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });

  const existing = cart.items.find((i) => i.food.equals(foodId));
  existing ? existing.qty++ : cart.items.push({ food: foodId, qty: 1 });

  await cart.save();
  const refreshed = await cart.populate("items.food");
  res.json(refreshed);
});

/* ────────── REMOVE / DECREMENT ITEM ────────── */
router.delete("/:foodId", auth, async (req, res) => {
  const { foodId } = req.params;
  const userId     = req.user.id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const idx = cart.items.findIndex((i) => i.food.equals(foodId));
  if (idx === -1) return res.status(404).json({ message: "Item not in cart" });

  cart.items[idx].qty > 1 ? cart.items[idx].qty-- : cart.items.splice(idx, 1);

  await cart.save();
  const refreshed = await cart.populate("items.food");
  res.json(refreshed);
});

/* ────────── GET CURRENT USER CART ────────── */
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.food");
  res.json(cart || { items: [] });
});

module.exports = router;
