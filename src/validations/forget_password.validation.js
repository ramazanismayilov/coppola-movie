const { z } = require("zod");

const createForgetPasswordToken = z.object({
  email: z.string().email(),
});

const confirmPassword = z.object({
  token: z.string().uuid(),
  password: z.string().min(6),
  repeatPassword: z.string().min(6),
});

const forgetPasswordValidation = {
  createForgetPasswordToken,
  confirmPassword,
};

module.exports = forgetPasswordValidation;