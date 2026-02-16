const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { vehicle_dashboard_enums } = require("@databases/sequelize/enums");

const VehicleDashboard = sequelize.define(
  "vehicle_dashboard",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    condition: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_dashboard_enums.condition),
      allowNull: true,
      defaultValue: null,
    },
    material: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_dashboard_enums.material),
      allowNull: true,
      defaultValue: null,
    },
    color: {
      type: DataTypes.STRING,
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

module.exports = VehicleDashboard;
