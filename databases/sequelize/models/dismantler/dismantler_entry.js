const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const DismantlerEntry = sequelize.define(
  "dismantler_entry",
  {
    entry_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    dismantler_entry: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_safety: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    // TODO remove
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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

module.exports = DismantlerEntry;
