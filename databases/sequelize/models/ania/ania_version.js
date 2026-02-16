const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const AniaVersion = sequelize.define(
  "ania_version",
  {
    version_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    ania_version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ania_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produced_from: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    produced_to: {
      type: DataTypes.DATEONLY,
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

module.exports = AniaVersion;
