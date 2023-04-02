const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/dbORM");

const OrderItemORM = sequelize.define("orderItem", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = OrderItemORM;
