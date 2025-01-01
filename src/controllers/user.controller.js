const userService = require("../services/user.service");

const list = async (req, res, next) => {
  try {
    let users = await userService.list();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    let result = await userService.create(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const result = await userService.resetPassword(req.user._id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const userController = {
  list,
  create,
  resetPassword
};

module.exports = userController;
