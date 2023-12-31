const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    iduser: {
      type: String,
      //required: true,
    },

    title: {
      type: String,
      //required: true,
    },
    content: {
      type: String,
      //required: true,
    },
    author: {
      type: String,
      //required: true,
    },
    media: {
      type: String,
      //required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    // Add other fields specific to your post model
  }
);

const Post = model("Post", postSchema);

module.exports = { Post };
