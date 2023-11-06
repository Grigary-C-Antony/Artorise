const express = require("express");
const { Artwork } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const artwork = new Artwork(req.body);
    const savedArtwork = await artwork.save();
    res.status(201).json(savedArtwork);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get artwork by ID
router.get("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update artwork by ID
router.put("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete artwork by ID
router.delete("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndDelete(req.params.id);
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }
    res.json({ message: "Artwork deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
