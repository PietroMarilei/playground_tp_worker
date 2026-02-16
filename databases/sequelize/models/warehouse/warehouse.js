const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const Warehouse = sequelize.define(
  "warehouse",
  {
    warehouse_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    archived_at: {
      type: DataTypes.DATE,
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

module.exports = Warehouse;
