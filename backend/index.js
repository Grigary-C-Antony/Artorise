const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const { verifyToken } = require("./controllers/jwtHandler");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const artRoutes = require("./routes/artwork");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware for verifying JWT

app.use(verifyToken); // Apply the JWT verification middleware to all routes

// routes
app.use("/admin/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/artwork", artRoutes);

// routes

app.get("/check", (req, res) => {
  res.send("working");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
