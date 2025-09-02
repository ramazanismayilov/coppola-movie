const connectDB = require("../database");
const authService = require("../services/auth.service");

const login = async (req, res, next) => {
  try {
    await connectDB();
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    await connectDB();
    const newUser = await authService.register(req.body);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const authController = {
  login,
  register,
};

module.exports = authController;
