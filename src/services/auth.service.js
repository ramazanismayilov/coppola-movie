const { Op } = require("sequelize");
const User = require("../models/User.model");
const { NotFoundError, ConflictError } = require("../utils/error.utils");
const { encodePayload } = require("../utils/jwt.utils");
const bcrypt = require("bcrypt");

const login = async (params) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: params.emailOrUsername },
        { username: params.emailOrUsername },
      ],
    },
  });
  if (!user) {
    throw new NotFoundError("Email, username or password is incorrect.");
  }

  const isPasswordValid = await bcrypt.compare(params.password, user.password);
  if (!isPasswordValid)
    throw new NotFoundError("Email, username or password is wrong");

  const token = encodePayload({ userId: user.id });

  return { token, user };
};

const register = async (params) => {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email: params.email }, { username: params.username }],
    },
  });
  if (existingUser) {
    throw new ConflictError(`This email or username already exists.`);
  }

  const newUser = await User.create(params);
  return newUser;
};

const authService = {
  login,
  register,
};

module.exports = authService;
