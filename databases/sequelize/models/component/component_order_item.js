const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const ComponentOrderItem = sequelize.define(
  "component_order_item",
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },

    component_data: {
      type: Sequelize.TEXT,
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

module.exports = ComponentOrderItem;
