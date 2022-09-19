"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Verification extends Model {}

Verification.init(
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
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: false,
      defaultValue: false
    },
  },
  {
    sequelize,
    modelName: "Verification",
    tableName: "verifications",
  }
);

module.exports = Verification;
