const User = require("../models/User.model");

const list = async () => {
  const list = await User.find();
  return list.map(user => user.toJSON());
};

const create = async (params) => {
  let user = new User(params);
  return user;
};

const userService = {
  list,
  create,
};

module.exports = userService;
