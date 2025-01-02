const User = require("../models/User.model");
const { NotFoundError, ValidationError } = require("../utils/error.utils");
const bcrypt = require("bcrypt");

const list = async () => {
  const list = await User.find();
  return list.map((user) => user.toJSON());
};

const create = async (params) => {
  let user = new User(params);
  return user;
};

const resetPassword = async (userId, params) => {
  const { currentPassword, newPassword, repeatPassword } = params;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User is not found");

  if (newPassword !== repeatPassword)
    throw new ValidationError("Repeat password is not equal with new password");

  const checkPassword = await bcrypt.compare(currentPassword, user.password);
  if (!checkPassword)
    throw new ValidationError("Current password is not correct");

  const isSameAsCurrent = await bcrypt.compare(newPassword, user.password);
  if (isSameAsCurrent)
    throw new ValidationError(
      "New password cannot be the same as the current password"
    );

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return {
    message: "User password is succesfully updated",
  };
};

const userService = {
  list,
  create,
  resetPassword,
};

module.exports = userService;
