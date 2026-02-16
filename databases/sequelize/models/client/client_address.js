const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { country_enums } = require("@databases/sequelize/enums");

const ClientAddress = sequelize.define(
  "client_address",
  {
    client_address_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    to: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    address1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: null,
    },
    province: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null,
    },
    country: {
      type: DataTypes.ENUM,
      values: country_enums,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: null,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = ClientAddress;
