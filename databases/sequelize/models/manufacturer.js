const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { manufacturer_enums } = require("@databases/sequelize/enums");

const Manufacturer = sequelize.define(
  "manufacturer",
  {
    manufacturer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    manufacturer_type: {
      type: DataTypes.ENUM,
      values: manufacturer_enums.manufacturer_type,
      allowNull: false,
    },

    entity: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "component",
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

module.exports = Manufacturer;
