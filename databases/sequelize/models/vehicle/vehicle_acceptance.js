const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const VehicleAcceptance = sequelize.define(
  "vehicle_acceptance",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },

    accepted_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },

    purchase_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },

    purchased_from: {
      type: DataTypes.TEXT,
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

module.exports = VehicleAcceptance;
