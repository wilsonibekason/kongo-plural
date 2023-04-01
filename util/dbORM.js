const Sequelize = require("sequelize").Sequelize;
const sequelize = new Sequelize("nodelearn", "root", "Wil__001", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
