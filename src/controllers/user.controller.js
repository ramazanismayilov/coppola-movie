const connectDB = require("../database");
const userService = require("../services/user.service");

const list = async (req, res, next) => {
  try {
    await connectDB();
    let users = await userService.list();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    await connectDB();
    let result = await userService.updateProfile(req.user._id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await connectDB();
    const result = await userService.resetPassword(req.user._id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const userController = {
  list,
  updateProfile,
  resetPassword,
};

module.exports = userController;
