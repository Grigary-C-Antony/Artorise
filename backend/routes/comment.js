const express = require("express");
const { Comment } = require("../models");

const router = express.Router();
// const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const wishlistOut = await comment.save();
    res.status(201).json(wishlistOut);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all artworks
router.get("/", async (req, res) => {
  try {
    const comment = await Comment.find();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get comment by ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update comment by ID
router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete comment by ID
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
