const ArticleCategory = require("../models/article-category.model");

exports.fetch = async (req, res) => {
  const articleCategories = await ArticleCategory.findAll();
  return res.status(200).json(articleCategories);
}