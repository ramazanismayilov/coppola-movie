const { z } = require("zod");

const create = z.object({
  username: z
    .string()
    .nonempty("Username must be entered.")
    .min(5, "Username must be at least 3 characters long.")
    .max(30, "Username can be up to 30 characters long."),
  email: z
    .string()
    .email("Please enter a valid email.")
    .nonempty("Email must be entered."),
  password: z
    .string()
    .min(5, "Password must be at least 6 characters long.")
    .max(30, "Password can be up to 50 characters long."),
  phone: z
    .string()
    .optional(),
});

const userValidation = {
  create,
};

module.exports = userValidation;
