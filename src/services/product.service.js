const Product = require("../models/Product.model");
const Review = require("../models/Review.model");
const { ConflictError } = require("../utils/error.utils");
const generateSlug = require("../utils/slug.utils");

const allProducts = async () => {
  const allProducts = await Product.find()
    .populate("image", "url")
    .populate("review", "user comment rating parentId")
    .populate("category", "name")
    .sort({ order: 1 });
    allProducts.forEach(product => {
      console.log("Reviews", product.review); // Access reviews for each product
      console.log("Title", product.title); // Access title for each product
    });
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
