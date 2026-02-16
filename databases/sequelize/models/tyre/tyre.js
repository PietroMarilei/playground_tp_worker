const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { tyre_enums } = require("@databases/sequelize/enums");

const Tyre = sequelize.define(
  "tyre",
  {
    tyre_id: {
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

    width: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    aspect_ratio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    construction: {
      type: DataTypes.ENUM,
      values: Object.keys(tyre_enums.construction),
      allowNull: true,
      defaultValue: null,
    },
    rim_diameter: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    load_index: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    speed_index: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    specification: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    season: {
      type: DataTypes.ENUM,
      values: Object.keys(tyre_enums.season),
      allowNull: true,
      defaultValue: null,
    },
    dot: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    tread: {
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
      values: Object.keys(tyre_enums.status),
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

module.exports = Tyre;
