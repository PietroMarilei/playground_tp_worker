const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const WheelOrderItem = sequelize.define(
  "wheel_order_item",
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },

    wheel_data: {
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

module.exports = WheelOrderItem;
