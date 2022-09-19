"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Newsletter extends Model {}

Newsletter.init(
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Newsletter",
    tableName: "newsletters",
  }
);

module.exports = User;
