const User = require("../models/User.model");
const { NotFoundError, ValidationError } = require("../utils/error.utils");
const bcrypt = require("bcrypt");
const dateFns = require("date-fns");
const sendMail = require("../utils/mail.utils");
const config = require("../config");
const renderTemplate = require("../utils/template.utils");
const uuid = require("uuid");
const Activation = require("../models/Activation.model");

const list = async () => {
  const list = await User.find();
  return list.map((user) => user.toJSON());
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

const forgetPassword = async (email) => {
  const user = await User.findOne({email});
  if (!user) throw new NotFoundError("User with this email is not exists");

  const activationToken = uuid.v4();

  await Activation.create({
    userId: user._id,
    token: activationToken,
    expireDate: dateFns.addMinutes(new Date(), 10),
    type: "resetPassword",
  });

  const content = await renderTemplate("reset-password", {
    user: user.toJSON(),
    websiteUrl: config.appUrl,
    activationUrl: `${config.appUrl}/api/users/forget_password?token=${activationToken}`,
  });

  await sendMail(config.smtp.from, user.email, "Reset password", content);

  return {
    message: "The message has been sent to your email.",
  };
};

const confirmPassword = async (params) => {
  const activation = await Activation.findOne({
    token: params.token,
    expireDate: { $gte: new Date() }, 
  });
  if (!activation) throw new AppError("Activation token is wrong", 400);

  const user = await User.findById(activation.userId);
  if (!user) throw new NotFoundError("User is not found");

  if (params.password !== params.repeatPassword)
    throw new AppError("Passwords are not same", 400);

  user.password = await bcrypt.hash(params.password, 10);
  await user.save();
  await activation.deleteOne();

  return {
    message: "User password is successfully updated",
  };
};

const userService = {
  list,
  resetPassword,
  forgetPassword,
  confirmPassword
};

module.exports = userService;
