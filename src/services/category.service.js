const Category = require("../models/Category.model");
const { ConflictError, NotFoundError } = require("../utils/error.utils");
const generateSlug = require("../utils/slug.utils");

const allCategories = async () => {
  const allCategories = await Category.find().sort({ order: 1 });
  return allCategories;
};

const addCategory = async (params) => {
  const existsCategory = await Category.findOne({ name: params.name });
  if (existsCategory) throw new ConflictError("Category already exists");

  if (!params.slug) {
    params.slug = generateSlug(params.name);
  }

  const newCategory = new Category(params);
  await newCategory.save();

  return {
    message: "Category added succesfully",
    newCategory,
  };
};

const updateCategory = async (id, params) => {
  if (!params.slug) {
    params.slug = generateSlug(params.name);
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, params, {
    new: true,
  });
  if (!updatedCategory) throw new NotFoundError("Category is not found");

  return {
    message: "Category updated succesfully",
    updatedCategory,
  };
};

const deleteCategory = async (id) => {
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) throw new NotFoundError("Category is not found");

  return {
    message: "Category deleted succesfully",
    deletedCategory,
  };
};

const categoryService = {
  allCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};

module.exports = categoryService;
