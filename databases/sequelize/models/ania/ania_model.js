const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const AniaModel = sequelize.define(
  "ania_model",
  {
    model_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    ania_model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ania_id: {
      type: DataTypes.INTEGER,
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

module.exports = AniaModel;
