const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const {
  side_enums,
  vehicle_headlight_enums,
} = require("@databases/sequelize/enums");

const VehicleHeadlight = sequelize.define(
  "vehicle_headlight",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    side: {
      type: DataTypes.ENUM,
      values: Object.keys(side_enums),
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_headlight_enums.type),
      allowNull: true,
      defaultValue: null,
    },
    condition: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_headlight_enums.condition),
      allowNull: true,
      defaultValue: null,
    },
    functionality: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_headlight_enums.functionality),
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

module.exports = VehicleHeadlight;
