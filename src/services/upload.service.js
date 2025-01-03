const Upload = require("../models/Upload.model");

const uploadImages = async (files) => {
  const images = await Promise.all(
    files.map(file => {
      const image = new Upload({
        url: `/uploads/${file.filename}`,
      });
      return image.save();
    })
  );
  return images;
};

const uploadService = {
  uploadImages,
};

module.exports = uploadService;
