"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Article extends Model { }

Article.init(
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: false,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    pictures: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: false,
    },
    stockMin: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: false
    }
  },
  {
    sequelize,
    modelName: "Article",
    tableName: "articles",
  }
);

module.exports = Article;
