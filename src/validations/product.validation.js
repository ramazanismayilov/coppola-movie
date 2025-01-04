const { z } = require("zod");
const reviewValidation = require("./review.validation");

const addProduct = z.object({
  title: z.string().trim(),
  image: z.string(),
  description: z.string().trim(),
  price: z.number(),
  category: z.string(),
  slug: z.string().trim().optional(),
  order: z.number().optional().default(0),
  sku: z.string().trim().optional(),
  tag: z.string().trim().optional(),
  review: z.array(reviewValidation.addReview).optional(),
});

const updateProduct = z.object({
  title: z.string().trim().optional(),
  image: z.string().optional(),
  description: z.string().trim().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  slug: z.string().trim().optional(),
  order: z.number().optional().default(0),
  sku: z.string().trim().optional(),
  tag: z.string().trim().optional(),
  review: z.array(reviewValidation.updateReview).optional(),
});

const productValidation = {
  addProduct,
  updateProduct,
};

module.exports = productValidation;
