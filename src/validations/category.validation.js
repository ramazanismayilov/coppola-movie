const { z } = require("zod");

const createCategory = z.object({
  name: z.string().trim(),
  slug: z.string().trim().optional(),
  order: z.number().optional().default(0),
});

const updateCategory = z.object({
  name: z.string().trim().optional(),
  slug: z.string().trim().optional(),
  order: z.number().optional(),
});

const categoryValidation = {
  createCategory,
  updateCategory,
};

module.exports = categoryValidation;
