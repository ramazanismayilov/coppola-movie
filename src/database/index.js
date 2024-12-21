const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.databaseUrl, {
  pool: {
    max: 5, // Maksimum bağlantı sayısı
    min: 0, // Minimum bağlantı sayısı
    acquire: 30000, // Maksimum bekleme süresi
    idle: 10000, // Bağlantının boşta kalma süresi
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
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
