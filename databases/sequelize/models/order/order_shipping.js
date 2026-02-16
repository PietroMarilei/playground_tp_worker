const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { country_enums } = require("@databases/sequelize/enums");

const OrderShipping = sequelize.define(
  "order_shipping",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    to: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    address1: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    address2: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null,
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
      allowNull: true,
      defaultValue: null,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true,
      defaultValue: null,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: false,

    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = OrderShipping;
