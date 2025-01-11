const { z } = require("zod");

const login = z.object({
  email: z.string().email(),
  password: z.string().regex(/^[A-Z][a-zA-Z0-9]*\d+$/),
});

const register = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(30)
    .regex(/^[A-Z][a-zA-Z0-9]*\d+$/),
});

const authValidation = {
  login,
  register,
};

module.exports = authValidation;
