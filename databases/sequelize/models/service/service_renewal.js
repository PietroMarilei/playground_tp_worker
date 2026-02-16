const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums

const ServiceRenewal = sequelize.define(
  "service_renewal",
  {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    unit: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: null,
    },
    price_per_unit: {
      type: DataTypes.DECIMAL(10, 2),
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

module.exports = ServiceRenewal;
