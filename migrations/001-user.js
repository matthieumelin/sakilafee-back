"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      civility: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      additionnalAddress: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      postalCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      society: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      tva: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      permission: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      accessToken: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false,
      },
      accessTokenExpires: {
        type: Sequelize.BIGINT,
        allowNull: true,
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
    await queryInterface.dropTable("Users");
  },
};
