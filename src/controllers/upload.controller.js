const connectDB = require("../database");
const uploadService = require("../services/upload.service");
const { AppError } = require("../utils/error.utils");

const addImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError("At least one file is required", 400);
    }
    await connectDB();
    let result = await uploadService.addImage(req.file);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteImage = async (req, res, next) => {
  try {
    await connectDB();
    const deletedImage = await uploadService.deleteImage(req.params.id);
    res.json(deletedImage);
  } catch (error) {
    next(error);
  }
};

const uploadController = {
  addImage,
  deleteImage,
};

module.exports = uploadController;
