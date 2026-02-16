const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const VehicleMetafieldValue = sequelize.define(
  "vehicle_metafield_value",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    metafield_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    value: {
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

module.exports = VehicleMetafieldValue;
