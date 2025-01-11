const uploadService = require("../services/upload.service");
const { AppError } = require("../utils/error.utils");

const addImage = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new AppError("At least one file is required", 400);
    }
    let result = await uploadService.addImage(req.files);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteImage = async (req, res, next) => {
  try {
    const deletedImage = await uploadService.deleteImage(req.params.id)
    res.json(deletedImage)
  } catch (error) {
    next(error)
  }
}

const uploadController = {
  addImage,
  deleteImage
};

module.exports = uploadController;
