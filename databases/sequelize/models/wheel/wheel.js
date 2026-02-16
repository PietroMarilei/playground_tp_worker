const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { wheel_enums } = require("@databases/sequelize/enums");

const Wheel = sequelize.define(
  "wheel",
  {
    wheel_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    label: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    lot: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    material: {
      type: DataTypes.ENUM,
      values: Object.keys(wheel_enums.material),
      allowNull: true,
      defaultValue: null,
    },
    finish: {
      type: DataTypes.ENUM,
      values: Object.keys(wheel_enums.finish),
      allowNull: true,
      defaultValue: null,
    },
    diameter: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    offset: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    holes: {
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
      values: Object.keys(wheel_enums.status),
      defaultValue: "available",
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
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

module.exports = Wheel;
