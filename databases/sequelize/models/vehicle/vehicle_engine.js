const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { vehicle_engine_enums } = require("@databases/sequelize/enums");

const VehicleEngine = sequelize.define(
  "vehicle_engine",
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

    propulsion: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_engine_enums.propulsion),
      allowNull: true,
      defaultValue: null,
    },

    kw: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    hp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    displacement: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    cylinders: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    valves: {
      type: DataTypes.INTEGER,
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
      values: Object.keys(vehicle_engine_enums.condition),
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

module.exports = VehicleEngine;
