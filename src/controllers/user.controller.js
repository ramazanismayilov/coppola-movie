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

const userController = {
  list,
  create,
};

module.exports = userController;
