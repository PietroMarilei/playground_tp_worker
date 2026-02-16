const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const Reservation = sequelize.define(
  "reservation",
  {
    reservation_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    reserved_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    reserved_to: {
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

module.exports = Reservation;
