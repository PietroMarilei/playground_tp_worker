const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const {
  country_enums,
  client_billing_enums,
} = require("@databases/sequelize/enums");

const ClientBilling = sequelize.define(
  "client_billing",
  {
    client_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    billing: {
      type: DataTypes.ENUM,
      values: Object.keys(client_billing_enums.billing),
      allowNull: false,
      defaultValue: "private",
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
    ssn: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    vat: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null,
    },
    sdi: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null,
    },
    pec: {
      type: DataTypes.STRING(100),
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
  }
);

module.exports = ClientBilling;
