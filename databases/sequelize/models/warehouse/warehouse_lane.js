const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const WarehouseLane = sequelize.define(
  "warehouse_lane",
  {
    warehouse_lane_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    lane: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = WarehouseLane;
