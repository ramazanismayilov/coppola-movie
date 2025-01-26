const { z } = require("zod");

const addProduct = z.object({
  title: z.string().trim(),
  image: z.any(),
  description: z.string().trim(),
  price: z.number(),
  category: z.string(),
  slug: z.string().trim().optional(),
  order: z.number().optional().default(0),
  sku: z.string().trim().optional(),
  tag: z.string().trim().optional(),
  discount: z.number().min(0).max(100).optional().default(0),
  isProductNew: z.boolean().optional().default(false),
});

const updateProduct = z.object({
  title: z.string().trim().optional(),
  image: z.any().optional(),
  description: z.string().trim().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  slug: z.string().trim().optional(),
  order: z.number().optional().default(0),
  sku: z.string().trim().optional(),
  tag: z.string().trim().optional(),
  discount: z.number().min(0).max(100).optional(),
  isProductNew: z.boolean().optional(),
});

const productValidation = {
  addProduct,
  updateProduct,
};

module.exports = productValidation;
