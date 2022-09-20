"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("article_categories", {
      articleId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("articles_categories");
  },
};
