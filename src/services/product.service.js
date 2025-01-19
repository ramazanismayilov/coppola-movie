const Product = require("../models/Product.model");
const { ConflictError } = require("../utils/error.utils");
const generateSlug = require("../utils/slug.utils");

const allProducts = async () => {
  const allProducts = await Product.find()
    .populate("image", "url")
    .populate("category", "name")
    .sort({ createdAt: -1 });
  return allProducts;
};

const addProduct = async (params) => {
  const existsProduct = await Product.findOne({ title: params.title });
  if (existsProduct) throw new ConflictError("Product already exists");

  if (!params.slug) {
    params.slug = generateSlug(params.title);
  }

  const newProduct = new Product(params);
  await newProduct.save();

  return {
    message: "Product addded succesfully",
    newProduct,
  };
};

const updateProduct = () => {};
const deleteProduct = () => {};

const productService = {
  allProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};

module.exports = productService;
