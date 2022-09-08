"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Feedback extends Model {}

Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    note: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: false,
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    modelName: "Feedback",
    tableName: "feedbacks",
  }
);

module.exports = Feedback;
