const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const DismantlerServiceSubscriptionUsage = sequelize.define(
  "dismantler_service_subscription_usage",
  {
    dismantler_service_subscription_usage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    input: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    output: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    is_successful: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

module.exports = DismantlerServiceSubscriptionUsage;
