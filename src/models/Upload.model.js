const { Schema, model } = require("mongoose");

const UploadSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Upload = model("Upload", UploadSchema);

module.exports = Upload;
