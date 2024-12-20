const jwt = require("jsonwebtoken");
const config = require("../config");

const encodePayload = (payload) => {
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "5h" });
  return token;
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return false;
  }
};

module.exports = {
  encodePayload,
  decodeToken,
};
