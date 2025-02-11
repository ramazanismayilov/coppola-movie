const blogService = require("../services/blog.service");

const addBlog = async (req, res, next) => {
  try {
    const newBlog = await blogService.addBlog(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
};

const allBlogs = async (req, res, next) => {
  try {
    const allBlogs = await blogService.allBlogs(req.query);
    res.json(allBlogs);
  } catch (error) {
    next(error);
  }
};

const singleBlog = async (req, res, next) => {
  try {
    const singleBlog = await blogService.singleBlog(req.params.id);
    res.json(singleBlog);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const updatedBlog = await blogService.updateBlog(req.params.id, req.body);
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const deletedBlog = await blogService.deleteBlog(req.params.id);
    res.json(deletedBlog);
  } catch (error) {
    next(error);
  }
};

const blogController = {
  addBlog,
  allBlogs,
  singleBlog,
  updateBlog,
  deleteBlog,
};

module.exports = blogController;
