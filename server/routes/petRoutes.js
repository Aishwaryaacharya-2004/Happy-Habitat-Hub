const express = require("express");
const multer = require("multer");
const Pet = require("../models/Pet");
const Lover = require("../models/Lover"); // Updated: Use Lover model instead of User
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Get all pets
router.get("/", async (req, res) => {
  const pets = await Pet.find().populate("uploadedBy", "name email"); // Populate uploader details
  res.json(pets);
});

// Upload a new pet
router.post("/upload", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user.id;
    const lover = await Lover.findById(userId);
    if (!lover) return res.status(404).json({ message: "User not found" });

    const newPet = new Pet({
      imageUrl: `/uploads/${req.file.filename}`,
      description,
      uploadedBy: lover._id,
      uploadedAt: new Date(),
    });

    await newPet.save();
    res.json({ message: "Pet uploaded successfully!", pet: newPet });
  } catch (error) {
    res.status(500).json({ message: "Error uploading pet", error });
  }
});


// Like a pet
router.post("/like/:id", authMiddleware, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    pet.likes += 1;
    await pet.save();
    res.json({ message: "Liked!", likes: pet.likes });
  } catch (error) {
    res.status(500).json({ message: "Error liking pet", error });
  }
});

module.exports = router;
