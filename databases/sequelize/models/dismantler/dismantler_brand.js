const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const DismantlerBrand = sequelize.define(
  "dismantler_brand",
  {
    brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    dismantler_brand: {
      type: DataTypes.STRING(100),
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

module.exports = DismantlerBrand;
