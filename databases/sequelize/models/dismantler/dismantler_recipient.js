const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const DismantlerRecipient = sequelize.define(
  "dismantler_recipient",
  {
    dismantler_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    recipient: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    address1: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING(120),
      allowNull: true,
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    zip: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: null,
    },
    province: {
      type: DataTypes.STRING(80),
      allowNull: true,
      defaultValue: null,
    },
    country: {
      type: DataTypes.STRING(80),
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
    paranoid: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = DismantlerRecipient;
