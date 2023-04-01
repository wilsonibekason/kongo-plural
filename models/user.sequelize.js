const { Sequelize, DataTypes, DatabaseError } = require("sequelize");
const sequelise = require("../util/dbORM");

const UserORM = sequelise.define("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserORM;
