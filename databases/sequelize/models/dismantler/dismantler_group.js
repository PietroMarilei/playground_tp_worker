const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const DismantlerGroup = sequelize.define(
  "dismantler_group",
  {
    group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    dismantler_group: {
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

module.exports = DismantlerGroup;
