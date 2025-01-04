const Review = require("../models/Review.model");
const Product = require("../models/Product.model");

const allReviews = async () => {
  const allReviews = await Review.find()
    .populate("user", "username email")
    .populate("parentId", "comment rating")
    .populate("product", "title")
    .sort({ createdAt: -1 });

  return allReviews;
};

const addReview = async (productId, userId, reviewData) => {
  const newReview = new Review({
    ...reviewData,
    product: productId,
    user: userId,
  });
  await newReview.save();

  console.log(newReview.product);
  

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
