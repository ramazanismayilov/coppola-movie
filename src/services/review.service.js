const Review = require("../models/Review.model");
const Product = require("../models/Product.model");

const allReviews = async () => {
  const allReviews = await Review.find()
    .populate("user", "username")
    .populate("parentId", "comment rating")
    .populate("product", "title")
    .sort({ createdAt: -1 });

  const totalReviews = await Review.countDocuments();

  return {
    allReviews,         
    totalReviews,
  };
};

const addReview = async (productId, userId, reviewData) => {
  if (reviewData.parentId) {
    const parentReview = await Review.findById(reviewData.parentId);
    if (!parentReview) {
      throw new Error("Parent review not found.");
    }
  }

  const newReview = new Review({
    ...reviewData,
    product: productId,
    user: userId,
  });
  await newReview.save();

  await Product.findByIdAndUpdate(
    productId,
    { $push: { reviews: newReview._id } },
    { new: true }
  );
  return {
    message: "Review added successfully",
    newReview,
  };
};

const updateReview = () => {};

const deleteReview = () => {};

const reviewService = {
  allReviews,
  addReview,
  updateReview,
  deleteReview,
};

module.exports = reviewService;
