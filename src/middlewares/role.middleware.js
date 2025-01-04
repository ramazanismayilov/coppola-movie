const { ForbiddenError } = require("../utils/error.utils");

const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) return next();
    next(new ForbiddenError("Forbidden"));
  };
};

module.exports = roleMiddleware;
