const connectDB = require("../database");
const reviewService = require("../services/review.service");

const allReviews = async (req, res, next) => {
  try {
    await connectDB();
    const reviews = await reviewService.allReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  try {
    await connectDB();
    const newReview = await reviewService.addReview(
      req.body.productId,
      req.user.id,
      req.body
    );

    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

const updateReview = () => {};

const deleteReview = () => {};

const reviewController = {
  allReviews,
  addReview,
  updateReview,
  deleteReview,
};

module.exports = reviewController;
