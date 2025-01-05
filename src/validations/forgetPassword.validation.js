const { z } = require("zod");

const forgetPassword = z.object({
  email: z.string().email(),
});

const confirmPassword = z.object({
  token: z.string().uuid(),
  password: z.string().min(6).max(30).regex(/^[A-Z][a-zA-Z0-9]*\d+$/),
  repeatPassword: z.string().min(6).max(30).regex(/^[A-Z][a-zA-Z0-9]*\d+$/),
});

const forgetPasswordValidation = {
  forgetPassword,
  confirmPassword,
};

module.exports = forgetPasswordValidation;
