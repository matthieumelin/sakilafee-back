"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: false,
    },
    phone: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      unique: true,
    },
    civility: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: false,
    },
    additionnalAddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: false,
    },
    postalCode: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      unique: true,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    society: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    tva: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    permission: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
      defaultValue: "user"
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: false,
      defaultValue: false
    }
    // accessToken: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    //   unique: false,
    // },
    // accessTokenExpires: {
    //   type: DataTypes.BIGINT,
    //   allowNull: true,
    //   unique: false,
    // },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

module.exports = User;
