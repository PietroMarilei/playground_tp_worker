const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const {
  side_enums,
  vehicle_taillight_enums,
} = require("@databases/sequelize/enums");

const VehicleTaillight = sequelize.define(
  "vehicle_taillight",
  {
    vehicle_taillight_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    side: {
      type: DataTypes.ENUM,
      values: Object.keys(side_enums),
      unique: "vehicle_taillight_composite_index",
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_taillight_enums.type),
      allowNull: true,
      defaultValue: null,
    },
    segment: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_taillight_enums.segment),
      allowNull: true,
      defaultValue: null,
      unique: "vehicle_taillight_composite_index",
    },
    condition: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_taillight_enums.condition),
      allowNull: true,
      defaultValue: null,
    },
    functionality: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_taillight_enums.functionality),
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

module.exports = VehicleTaillight;
