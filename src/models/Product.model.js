const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Upload",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      trim: true,
      required: true,
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
    sku: {
      type: String,
      trim: true,
    },
    tag: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    discountedPrice: {
      type: Number,
      default: 0,
    },
    isProductNew: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);
module.exports = Product;
