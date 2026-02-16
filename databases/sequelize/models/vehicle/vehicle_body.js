const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { vehicle_body_enums } = require("@databases/sequelize/enums");

const VehicleBody = sequelize.define(
  "vehicle_body",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },

    color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    color_code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    finish: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_body_enums.finish),
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

module.exports = VehicleBody;
