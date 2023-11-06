const express = require("express");
const { User } = require("../models");

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all active users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ deletedAt: null });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific active user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userId,
      deletedAt: null,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an active user
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId, deletedAt: null },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Soft delete an active user
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndUpdate(
      { _id: req.params.userId, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
