const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const DismantlerMetafield = sequelize.define(
  "dismantler_metafield",
  {
    dismantler_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    metafield_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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

module.exports = DismantlerMetafield;
