// Sequelize
const Sequelize = require("sequelize");

// Settings
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    pool: {
      max: 15
    }
  }
);

module.exports = sequelize;
