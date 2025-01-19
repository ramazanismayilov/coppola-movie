const Blog = require("../models/Blog.model");
const { NotFoundError } = require("../utils/error.utils");
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

const allBlogs = async () => {
  const allBlogs = await Blog.findOne()
    .populate("image", "url")
    .sort({ createdAt: -1 });
  return allBlogs;
};

const singleBlog = async (id) => {
  const singleBlog = await Blog.findById(id).populate("image", "url");
  if (!singleBlog) throw new NotFoundError("Blog not found");
  return singleBlog;
};

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
