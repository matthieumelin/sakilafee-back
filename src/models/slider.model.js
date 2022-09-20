"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Slider extends Model {}

Slider.init(
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    bgColor: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    modelName: "Slider",
    tableName: "slider",
  }
);

module.exports = Slider;
