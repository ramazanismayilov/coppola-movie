const User = require("../models/User.model");
const { NotFoundError, ValidationError } = require("../utils/error.utils");
const bcrypt = require("bcrypt");
const Upload = require("../models/Upload.model");

const list = async () => {
  const list = await User.find();
  return list.map((user) => user.toJSON());
};

const updateProfile = async (id, params) => {
  let user = await User.findById(id);
  if (!user) throw new NotFoundError("User is not found");

  if (params.avatar) {
    let image = await Upload.findById(params.avatar);
    if (!image) throw new NotFoundError("Image is not found");

    user.avatar = image._id;

    delete params.avatar;
  }

  for (let [key, value] of Object.entries(params)) {
    user[key] = value;
  }

  await user.save();

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
  updateProfile,
  resetPassword,
};

module.exports = userService;
