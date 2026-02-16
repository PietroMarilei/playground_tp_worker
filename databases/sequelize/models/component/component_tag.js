const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { component_tag_enums } = require("@databases/sequelize/enums");

const ComponentTag = sequelize.define(
  "component_tag",
  {
    component_tag_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    color: {
      type: DataTypes.ENUM,
      values: component_tag_enums.color,
      allowNull: false,
      unique: "component_tag_composite_index",
    },
    tag: {
      type: Sequelize.TEXT,
      allowNull: true,
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

module.exports = ComponentTag;
