const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: "postgres", 
  logging: false, 
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection is successfully");
  })
  .catch((err) => {
    console.error("Database connection is failed", err);
  });

sequelize.sync({ alter: true });

module.exports = sequelize;
