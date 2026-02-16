const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { country_enums } = require("@databases/sequelize/enums");

const DismantlerAddress = sequelize.define(
  "dismantler_address",
  {
    dismantler_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
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
      type: DataTypes.ENUM,
      values: country_enums,
      allowNull: false,
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

module.exports = DismantlerAddress;
