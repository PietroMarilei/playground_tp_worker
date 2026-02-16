const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { component_enums, side_enums } = require("@databases/sequelize/enums");

const Component = sequelize.define(
  "component",
  {
    component_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    label: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },

    specification: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    is_disassembled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    oem_code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    constructor_code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    manufacturer_code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    other_codes: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },

    side: {
      type: DataTypes.ENUM,
      values: Object.keys(side_enums),
      allowNull: true,
      defaultValue: null,
    },
    weight: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    list_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    counter_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM,
      values: Object.keys(component_enums.status),
      defaultValue: "available",
      allowNull: true,
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

module.exports = Component;
