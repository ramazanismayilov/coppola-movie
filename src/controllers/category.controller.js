const categoryService = require("../services/category.service");

const allCategories = async (req, res, next) => {
  try {
    const allCategories = await categoryService.allCategories();
    res.json(allCategories);
  } catch (error) {
    next(error);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryService.addCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    res.json(deletedCategory);
  } catch (error) {
    next(error);
  }
};

const categoryController = {
  allCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};

module.exports = categoryController;
