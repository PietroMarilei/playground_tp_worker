const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { vehicle_media_enums } = require("@databases/sequelize/enums");

const VehicleMedia = sequelize.define(
  "vehicle_media",
  {
    vehicle_media_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    media_type: {
      type: DataTypes.ENUM,
      values: vehicle_media_enums.media_type,
      allowNull: false,
    },
    media: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    position: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
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

module.exports = VehicleMedia;
