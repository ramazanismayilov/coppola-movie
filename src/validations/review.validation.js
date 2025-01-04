const { z } = require("zod");

const addReview = z.object({
  user: z.string().optional(),
  product: z.string().optional(),
  comment: z.string().trim(),
  rating: z.number().min(1).max(5).optional(),
});

const updateReview = z.object({
  user: z.string().optional(),
  product: z.string().optional(),
  comment: z.string().trim().optional(),
  rating: z.number().min(1).max(5).optional(),
});

const reviewValidation = {
  addReview,
  updateReview,
};

module.exports = reviewValidation;
