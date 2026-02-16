const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { tyre_media_enums } = require("@databases/sequelize/enums");

const TyreMedia = sequelize.define(
  "tyre_media",
  {
    tyre_media_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    media_type: {
      type: DataTypes.ENUM,
      values: tyre_media_enums.media_type,
      defaultValue: "image",
      allowNull: false,
    },
    media: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    position: {
      type: DataTypes.INTEGER,
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

module.exports = TyreMedia;
