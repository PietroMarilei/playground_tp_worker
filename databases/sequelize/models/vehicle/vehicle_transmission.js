const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const {
  vehicle_transmission_enums,
  vehicle_transmission_drive_enums,
} = require("@databases/sequelize/enums");

const VehicleTransmission = sequelize.define(
  "vehicle_transmission",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },

    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    type: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_transmission_enums.type),
      allowNull: true,
      defaultValue: null,
    },
    gears: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    has_reverse: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    drive: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_transmission_enums.drive),
      allowNull: true,
      defaultValue: null,
    },
    is_tested: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    condition: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_transmission_enums.condition),
      allowNull: true,
      defaultValue: null,
    },
    notes: {
      type: DataTypes.TEXT,
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

module.exports = VehicleTransmission;
