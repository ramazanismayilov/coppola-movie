const User = require("../models/User.model");
const { UnauthorizedError } = require("../utils/error.utils");
const { decodeToken } = require("../utils/jwt.utils");

const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization || "";
  token = token.split(" ")[1];
  if (!token) return next(new UnauthorizedError("Unauthorized"));

  let payload = decodeToken(token);
  if (!payload?.userId) return next(new UnauthorizedError("Unauthorized"));

  let user = await User.findById(payload.userId);
  if (!user) return next(new UnauthorizedError("Unauthorized"));
  req.user = user;

  next();
};

module.exports = authMiddleware;
