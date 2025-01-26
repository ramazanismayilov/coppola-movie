const Product = require("../models/Product.model");
const { ConflictError } = require("../utils/error.utils");
const generateSlug = require("../utils/slug.utils");
const { deleteImage } = require("./upload.service");

const allProducts = async () => {
  const allProducts = await Product.find()
    .populate("image", "url")
    .populate("category", "name")
    .sort({ createdAt: -1 });
  return allProducts;
};

const singleProduct = async (id) => {
  const singleProduct = await Product.findById(id)
    .populate("image")
    .populate("category");
  if (!singleProduct) throw new NotFoundError("Product not found");
  return singleProduct;
};

const addProduct = async (params) => {
  const existsProduct = await Product.findOne({ title: params.title });
  if (existsProduct) throw new ConflictError("Product already exists");

  if (!params.slug) {
    params.slug = generateSlug(params.title);
  }

  if (params.discount > 0) {
    params.discountedPrice =
      params.price - (params.price * params.discount) / 100;
  } else {
    params.discountedPrice = params.price;
  }

  const newProduct = new Product(params);
  await newProduct.save();

  return {
    message: "Product addded succesfully",
    newProduct,
  };
};

const updateProduct = async (id, params) => {
  if (!params.slug) {
    params.slug = generateSlug(params.title);
  }

  const product = await Product.findByIdAndUpdate(id, params, {
    new: true,
  });
  if (!product) throw new NotFoundError("Product is not found");
  return {
    message: "Product updated succesfully",
    product,
  };
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new NotFoundError("Product is not found");

  await deleteImage(product.image._id);
  return {
    message: "Product deleted succesfully",
    product,
  };
};

const productService = {
  allProducts,
  singleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};

module.exports = productService;
