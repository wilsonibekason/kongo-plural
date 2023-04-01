const Sequelize = require("sequelize");
const { DataTypes, DatabaseError, ValidationError } = require("sequelize");
const sequelize = require("../util/dbORM");
const productORM = sequelize.define(
  "products",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = productORM;
