const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/dbORM");

const CartORM = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = CartORM;
