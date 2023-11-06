const express = require("express");
const { WishList } = require("../models");

const router = express.Router();
// const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const wishlist = new WishList(req.body);
    const wishlistOut = await wishlist.save();
    res.status(201).json(wishlistOut);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all artworks
router.get("/", async (req, res) => {
  try {
    const wishlist = await WishList.find();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get wishlist by ID
router.get("/:id", async (req, res) => {
  try {
    const wishlist = await WishList.findById(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ error: "WishList not found" });
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update wishlist by ID
router.put("/:id", async (req, res) => {
  try {
    const wishlist = await WishList.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!wishlist) {
      return res.status(404).json({ error: "WishList not found" });
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete wishlist by ID
router.delete("/:id", async (req, res) => {
  try {
    const wishlist = await WishList.findByIdAndDelete(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ error: "WishList not found" });
    }
    res.json({ message: "WishList deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
