"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class ArticleCategory extends Model {}

ArticleCategory.init(
  {
    articleId: {
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
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    modelName: "ArticleCategory",
    tableName: "article_categories",
  }
);

module.exports = ArticleCategory;
