const Upload = require("../models/Upload.model");
const { NotFoundError } = require("../utils/error.utils");

const addImage = async (files) => {
  const images = await Promise.all(
    files.map((file) => {
      const image = new Upload({
        url: `/uploads/${file.filename}`,
      });
      return image.save();
    })
  );
  return images;
};

const deleteImage = async (id) => {
  const image = await Upload.findById(id);
  if (!image) throw new NotFoundError("Image is not found");
  console.log("Image: ", image);

  const deletedImage = await Upload.findByIdAndDelete(id);
  return {
    message: "Image deleted successfully",
    deletedImage,
  };
};

const uploadService = {
  addImage,
  deleteImage,
};

module.exports = uploadService;
