const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const VehicleDrainage = sequelize.define(
  "vehicle_drainage",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },

    drained_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },

    notes: {
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

module.exports = VehicleDrainage;
