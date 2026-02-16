const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { action_enums } = require("@databases/sequelize/enums");

const MasterLog = sequelize.define(
  "master_log",
  {
    master_log_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    action: {
      type: Sequelize.ENUM,
      values: action_enums,
      allowNull: false,
    },
    entity: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    entity_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    data: {
      type: Sequelize.TEXT,
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

module.exports = MasterLog;
