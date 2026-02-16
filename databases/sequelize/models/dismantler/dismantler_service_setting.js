const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const DismantlerServiceSetting = sequelize.define(
  "dismantler_service_setting",
  {
    dismantler_service_setting_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    key: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: "dismantler_service_setting_composite_index",
    },
    type: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: "boolean",
    },
    value: {
      type: Sequelize.TEXT,
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

module.exports = DismantlerServiceSetting;
