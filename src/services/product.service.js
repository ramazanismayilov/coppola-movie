const Product = require("../models/Product.model");
const { ConflictError } = require("../utils/error.utils");
const generateSlug = require("../utils/slug.utils");
const { deleteImage } = require("./upload.service");

const allProducts = async (filter = {}) => {
  let where = {};

  if (filter.category) {
    where.category = {
      $in: filter.category,
    };
  }

  const page = filter.page ? parseInt(filter.page, 10) : 0;
  const visibleItemCount = filter.visibleItemCount
    ? parseInt(filter.visibleItemCount, 10)
    : 0;

  const allProducts = await Product.find(where)
    .populate("image", "url")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .skip(page > 0 && visibleItemCount > 0 ? (page - 1) * visibleItemCount : 0)
    .limit(visibleItemCount > 0 ? visibleItemCount : 0);

  const totalProducts = await Product.countDocuments(where);

  return {
    data: visibleItemCount > 0 ? allProducts : [],
    pagination: {
      currentPage: page,
      totalPages:
        visibleItemCount > 0 ? Math.ceil(totalProducts / visibleItemCount) : 0,
      totalProducts,
    },
  };
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
