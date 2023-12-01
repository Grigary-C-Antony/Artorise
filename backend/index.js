const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Replicate = require("replicate");

const { verifyToken } = require("./controllers/jwtHandler");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const artRoutes = require("./routes/artwork");
const { downloadImage, imageUploader } = require("./controllers/imgHandler");
const replicate = new Replicate({
  auth: "r8_TDtyrK0rwOmzbqm68k7cA1ZiDISB0TP0u69uZ",
});

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
app.get("/apiforimage", async (req, res) => {
  const output = await replicate.run(
    "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
    {
      input: {
        prompt: "a vision of paradise. unreal engine",
      },
    }
  );
  await imageUploader(output[0]).then((imgdata) =>
    res.json({ output: imgdata.url })
  );

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
