const mongoose = require("mongoose");

// Define schema for User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  cookie: { type: String },
  ipaddr: { type: String },
  authtype: { type: String },
  is_admin: { type: Boolean },
  profile_picture: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
});
const User = mongoose.model("User", userSchema);

// Define schema for Artwork
const artworkSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image_url: { type: String },
  likes: { type: Number },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date },
  updated_at: { type: Date },
});
const Artwork = mongoose.model("Artwork", artworkSchema);

// Define schema for Comment
const commentSchema = new mongoose.Schema({
  id_artwork: { type: mongoose.Schema.Types.ObjectId, ref: "Artwork" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date },
  updated_at: { type: Date },
});

const Comment = mongoose.model("Comment", commentSchema);

// Define schema for Saved Artwork
const savedArtworkSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  id_artwork: { type: mongoose.Schema.Types.ObjectId, ref: "Artwork" },
  created_at: { type: Date, default: Date.now },
});

const WishList = mongoose.model("SavedArtwork", savedArtworkSchema);

module.exports = {
  User,
  Artwork,
  Comment,
  WishList,
};
