const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { mailHandler } = require("../controllers/mailHandler");

const router = express.Router();

// Map to store OTPs and their expiration times
const otpMap = new Map();

// Login user and generate JWT
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, deletedAt: null });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE, // Token expiration time
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiration = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store the OTP and its expiration time in the map
    otpMap.set(username, { otp, password, otpExpiration });
    mailHandler(res, username, otp);
    // Send the email
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { username, otp } = req.body;

  try {
    const userData = otpMap.get(username);
    if (
      !userData ||
      userData.otp !== parseInt(otp) ||
      userData.otpExpiration < Date.now()
    ) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    otpMap.delete(username); // Remove the OTP entry from the map

    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
