const { z } = require("zod");

const resetPassword = z.object({
  currentPassword: z.string().min(5).max(30),
  newPassword: z.string().min(5).max(30),
  repeatPassword: z.string().min(5).max(30),
});

const forgetPassword = z.object({
  email: z.string().email(),
});

const confirmPassword = z.object({
  token: z.string().uuid(),
  password: z.string().min(6),
  repeatPassword: z.string().min(6),
});

const userValidation = {
  resetPassword,
  forgetPassword,
  confirmPassword,
};

module.exports = userValidation;
