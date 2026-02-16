const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const AniaType = sequelize.define(
  "ania_type",
  {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    ania_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ania_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
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

module.exports = AniaType;
