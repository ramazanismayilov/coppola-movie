const User = require("../models/User.model");
const { NotFoundError, ConflictError } = require("../utils/error.utils");
const { encodePayload } = require("../utils/jwt.utils");
const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const renderTemplate = require("../utils/template.utils");
const sendMail = require("../utils/mail.utils");
const config = require("../config");

const login = async (params) => {
  const user = await User.findOne({
    $or: [
      { email: params.emailOrUsername },
      { username: params.emailOrUsername },
    ],
  });
  if (!user) {
    throw new NotFoundError("Email, username or password is incorrect.");
  }

  const isPasswordValid = await bcrypt.compare(params.password, user.password);
  if (!isPasswordValid){
    console.log("Password validation failed");
    throw new NotFoundError("Email, username or password is wrong");
  }
  const token = encodePayload({ userId: user._id });

  return {
    message: "Login is successfully",
    token,
    user,
  };
};

const register = async (params) => {
  const existingUser = await User.findOne({
    $or: [{ email: params.email }, { username: params.username }],
  });
  if (existingUser) {
    throw new ConflictError(`This email or username already exists.`);
  }

  const user = new User(params);
  const mailContent = await renderTemplate("welcome-mail", {
    user: user.toJSON(),
    activationLink: "http://localhost.com",
    supportLink: "mailto:support@example.com",
  });

  await sendMail(
    config.smtp.from,
    user.email,
    "Welcome to our website",
    mailContent
  );

  await user.save();

  return {
    message: "User created successfully",
    user,
  };
};

const authService = {
  login,
  register,
};

module.exports = authService;
