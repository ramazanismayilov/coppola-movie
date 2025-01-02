const { Schema, model } = require("mongoose");

const ActivationSchema = new Schema(
  {
    userId: {
      type: String, 
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["activation", "resetPassword"],
      required: true,
    },
  },
  { timestamps: true }
);

const Activation = model("Activation", ActivationSchema);

module.exports = Activation;
