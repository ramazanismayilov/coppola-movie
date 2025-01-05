const forgetService = require("../services/forgetPassword.service");

const forgetPassword = async (req, res, next) => {
  try {
    const result = await forgetService.forgetPassword(req.body.email);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const confirmPassword = async (req, res, next) => {
  try {
    const result = await forgetService.confirmPassword(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const forgetPasswordController = {
  forgetPassword,
  confirmPassword,
};

module.exports = forgetPasswordController;
