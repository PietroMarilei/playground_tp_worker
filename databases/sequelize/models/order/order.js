const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const Order = sequelize.define(
  "order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    external_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    channel: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    ordered_at: {
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

module.exports = Order;
