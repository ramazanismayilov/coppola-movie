const { z } = require("zod");

const updateProfile = z.object({
  username: z.string().optional(),
  phone: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  location: z.string().optional(),
  avatar: z.string().optional(), 
});

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
  updateProfile,
  resetPassword,
  forgetPassword,
  confirmPassword,
};

module.exports = userValidation;
