const Blog = require("../models/Blog.model");
const { NotFoundError } = require("../utils/error.utils");
const generateSlug = require("../utils/slug.utils");
const { deleteImage } = require("./upload.service");

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
  const allBlogs = await Blog.find()
    .populate("image")
    .sort({ createdAt: -1 });
    return allBlogs;
};

const singleBlog = async (id) => {
  const singleBlog = await Blog.findById(id).populate("image", "url");
  if (!singleBlog) throw new NotFoundError("Blog not found");
  return singleBlog;
};

const updateBlog = async (id, params) => {
  if (!params.slug) {
    params.slug = generateSlug(params.title);
  }

  const blog = await Blog.findByIdAndUpdate(id, params, {
    new: true,
  });
  if (!blog) throw new NotFoundError("Blog is not found");
  return {
    message: "Blog deleted succesfully",
    blog,
  };
};

const deleteBlog = async (id) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) throw new NotFoundError("Blog is not found");
  console.log(blog.image._id);

  await deleteImage(blog.image._id);
  return {
    message: "Blog deleted succesfully",
    blog,
  };
};

const blogService = {
  addBlog,
  allBlogs,
  singleBlog,
  updateBlog,
  deleteBlog,
};

module.exports = blogService;
