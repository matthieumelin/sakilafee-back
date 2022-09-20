"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("slider", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      bgColor: {
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
    await queryInterface.dropTable("slider");
  },
};
