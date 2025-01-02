const Activation = require("../models/Activation.model");
const User = require("../models/User.model");
const { NotFoundError, AppError } = require("../utils/error.utils");
const uuid = require("uuid");
const dateFns = require("date-fns");
const sendMail = require("../utils/mail.utils");
const config = require("../config");
const renderTemplate = require("../utils/template.utils");
const bcrypt = require("bcrypt");

const createForgetPassword = async (email) => {
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
    activationUrl: `${config.appUrl}/api/forget_password?token=${activationToken}`,
  });

  await sendMail(config.smtp.from, user.email, "Reset password", content);

  return {
    message: "activation token is sent",
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

const forgetPasswordService = {
  createForgetPassword,
  confirmPassword
};

module.exports = forgetPasswordService;
