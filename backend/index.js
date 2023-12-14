const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Replicate = require("replicate");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const { verifyToken } = require("./controllers/jwtHandler");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const artRoutes = require("./routes/artwork");
const { downloadImage, imageUploader } = require("./controllers/imgHandler");
const cookieParser = require("cookie-parser");
const { jsonUpdater } = require("./controllers/jsonHandler");
const replicate = new Replicate({
  auth: "r8_TDtyrK0rwOmzbqm68k7cA1ZiDISB0TP0u69uZ",
});

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5174/",
      "http://localhost:5173/",
      "https://artorise.vercel.app/",
      "https://artorise-frontend.onrender.com/",
      "http://localhost:3003",
      "http://localhost:3002",
    ],
  })
  // cors()
);

// Connect to MongoDB

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
app.use(cookieParser());
// Middleware for verifying JWT
// Serve Vite build as static files
app.use(express.static(path.resolve(__dirname, "dist")));

// Catch-all route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});
app.get("/getdata", (req, res) => {
  fs.readFile("../backend/server.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Send the JSON data as the response
    res.json(jsonData);
  });
});
app.use(verifyToken); // Apply the JWT verification middleware to all routes

// routes
app.use("/admin/users", userRoutes);
// app.use("/auth", authRoutes);
app.use("/artwork", artRoutes);

// routes

app.get("/check", (req, res) => {
  res.send("working");
});
app.post("/apiforimage", async (req, res) => {
  const output = await replicate.run(
    "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
    {
      input: {
        prompt: req.body.desc,
      },
    }
  );
  let uuid = crypto.randomUUID();
  await imageUploader(output[0], uuid).then(async (imgdata) => {
    await jsonUpdater(uuid, imgdata.url, req.body.desc, req.body.title);
    res.json({ output: imgdata.url });
  });

  // let uuid = crypto.randomUUID();
  // await downloadImage(output[0], "img/" + uuid + ".png")
  //   .then(() => console.log("Image downloaded successfully"))
  //   .then(() => {
  //     res.json({ output });
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //     res.status(500).send("err");
  //   });
  // console.log(output);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
