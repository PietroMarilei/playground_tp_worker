const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const Log = sequelize.define(
  "log",
  {
    log_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    method: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    res: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    response_time: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    remote_addr: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    remote_user: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    referrer: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    user_agent: {
      type: Sequelize.STRING,
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
  }
);

module.exports = Log;
