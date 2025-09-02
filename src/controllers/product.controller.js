const connectDB = require("../database");
const productService = require("../services/product.service");

const allProducts = async (req, res, next) => {
  try {
    await connectDB();
    const allProducts = await productService.allProducts(req.query);
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
};

const singleProduct = async (req, res, next) => {
  try {
    await connectDB();
    const singleProduct = await productService.singleProduct(req.params.id);
    res.json(singleProduct);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    await connectDB();
    const newProduct = await productService.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    await connectDB();
    const updateProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );
    res.json(updateProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await connectDB();
    const deleteProduct = await productService.deleteProduct(req.params.id);
    res.json(deleteProduct);
  } catch (error) {
    next(error);
  }
};

const productController = {
  allProducts,
  singleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};

module.exports = productController;
