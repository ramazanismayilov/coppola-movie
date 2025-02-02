const { z } = require("zod");

const pageValidation = z.object({
  limit: Joi.number().min(1).default(10),
  page: Joi.number().min(1).default(1),
});

module.exports = pageValidation;
