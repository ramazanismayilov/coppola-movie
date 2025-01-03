const uploadService = require("../services/upload.service");
const { AppError } = require("../utils/error.utils");

const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new AppError("At least one file is required", 400);
    }
    let result = await uploadService.uploadImages(req.files);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const uploadController = {
  uploadImages,
};

module.exports = uploadController;
