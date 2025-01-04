const productService = require("../services/product.service");

const allProducts = async (req, res, next) => {
  try {
    const allProducts = await productService.allProducts();
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = () => {};
const deleteProduct = () => {};

const productController = {
  allProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};

module.exports = productController;
