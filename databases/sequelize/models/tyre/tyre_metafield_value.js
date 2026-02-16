const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const TyreMetafieldValue = sequelize.define(
  "tyre_metafield_value",
  {
    tyre_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    metafield_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
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

module.exports = TyreMetafieldValue;
