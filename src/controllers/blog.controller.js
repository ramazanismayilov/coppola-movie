const blogService = require("../services/blog.service");

const addBlog = async (req, res, next) => {
  try {
    const newBlog = await blogService.addBlog(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
};

const allBlogs = () => {};
const singleBlog = () => {};
const updateBlog = () => {};
const deleteBlog = () => {};

const blogController = {
  addBlog,
  allBlogs,
  singleBlog,
  updateBlog,
  deleteBlog,
};

module.exports = blogController;
