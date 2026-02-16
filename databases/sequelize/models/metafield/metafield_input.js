const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { metafield_input_enums } = require("@databases/sequelize/enums");

const MetafieldInput = sequelize.define(
  "metafield_input",
  {
    metafield_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },

    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM,
      values: Object.keys(metafield_input_enums.type),
      allowNull: false,
    },
    values: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    default: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
    },

    section: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    position: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    show_if: {
      type: Sequelize.TEXT,
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

module.exports = MetafieldInput;
