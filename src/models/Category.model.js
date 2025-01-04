const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    order: {
      type: Number,
      unique: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Category = model("Category", CategorySchema);

module.exports = Category;
