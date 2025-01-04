const reviewService = require("../services/review.service");

const allReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.allReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  try {
    const newReview = await reviewService.addReview(
      req.product._id,
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
