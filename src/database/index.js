const { default: mongoose } = require("mongoose");
const config = require("../config");

mongoose
  .connect(config.databaseUrl)
  .then(() => {
    console.log("Database connection is successfully");
  })
  .catch((err) => {
    console.error("Database connection is failed", err);
  });
