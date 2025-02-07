const path = require("path");

module.exports = {
  config: path.resolve(__dirname, "src/config/config.json"),
  "models-path": path.resolve(__dirname, "src/app/models"),
  "migrations-path": path.resolve(__dirname, "src/app/sequelize/migrations"), // Aqui
  "seeders-path": path.resolve(__dirname, "src/app/sequelize/seeders")
};