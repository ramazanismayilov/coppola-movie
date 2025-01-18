const { Schema, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Upload",
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", BlogSchema);
module.exports = Blog;
