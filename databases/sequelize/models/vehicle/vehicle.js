const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { vehicle_enums } = require("@databases/sequelize/enums");

const Vehicle = sequelize.define(
  "vehicle",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    plate: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    vin: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    produced_from: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    produced_to: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    registered_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },

    km: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },

    keys: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },

    counter_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM,
      values: Object.keys(vehicle_enums.status),
      defaultValue: "available",
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    pressed_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    archived_at: {
      type: DataTypes.DATE,
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

module.exports = Vehicle;
