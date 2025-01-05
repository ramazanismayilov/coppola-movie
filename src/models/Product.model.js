const { Schema, model } = require("mongoose");
const Review = require("../models/Review.model")

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
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.pre("remove", async function (next) {
  try {
    await Review.deleteMany({ product: this._id }); 
    next();
  } catch (err) {
    next(err);
  }
});


const Product = model("Product", ProductSchema);
module.exports = Product;
