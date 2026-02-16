const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { vehicle_entertainment_enums } = require("@databases/sequelize/enums");

const VehicleEntertainment = sequelize.define(
  "vehicle_entertainment",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_entertainment_enums.type),
      allowNull: true,
      defaultValue: null,
    },
    condition: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_entertainment_enums.condition),
      allowNull: true,
      defaultValue: null,
    },
    functionality: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_entertainment_enums.functionality),
      allowNull: true,
      defaultValue: null,
    },
    lockability: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_entertainment_enums.lockability),
      allowNull: true,
      defaultValue: null,
    },
    notes: {
      type: DataTypes.STRING,
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

module.exports = VehicleEntertainment;
