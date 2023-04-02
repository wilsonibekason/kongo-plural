const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/dbORM");

const OrderORM = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = OrderORM;
