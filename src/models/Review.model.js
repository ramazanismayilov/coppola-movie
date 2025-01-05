const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      default: null,
    },
  },
  { timestamps: true }
);

ReviewSchema.pre("remove", async function (next) {
  try {
    await Review.deleteMany({ parentId: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

const Review = model("Review", ReviewSchema);
module.exports = Review;
