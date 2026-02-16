const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const AccessPermission = sequelize.define(
  "access_permission",
  {
    access_permission_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    key: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: "access_permission_composite_index",
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
    paranoid: false,

    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = AccessPermission;
