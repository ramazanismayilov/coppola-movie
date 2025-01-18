const Blog = require("../models/Blog.model");
const generateSlug = require("../utils/slug.utils");

const addBlog = async (params) => {
  const existsBlog = await Blog.findOne({ title: params.title });
  if (existsBlog) throw new ConflictError("Blog already exists");

  if (!params.slug) {
    params.slug = generateSlug(params.title);
  }

  const newBlog = new Blog(params);
  await newBlog.save();
  return {
    message: "Blog addded succesfully",
    newBlog,
  };
};
const allBlogs = () => {};
const singleBlog = () => {};
const updateBlog = () => {};
const deleteBlog = () => {};

const blogService = {
  addBlog,
  allBlogs,
  singleBlog,
  updateBlog,
  deleteBlog,
};

module.exports = blogService;
