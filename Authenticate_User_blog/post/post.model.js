const mongooses = require("mongoose");
const { Schema } = mongooses;
const mongoose = require("../db/db");
const objectId = Schema.ObjectId;

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
