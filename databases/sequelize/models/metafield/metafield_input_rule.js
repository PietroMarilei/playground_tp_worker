const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { metafield_input_rule_enums } = require("@databases/sequelize/enums");

const MetafieldInputRule = sequelize.define(
  "metafield_input_rule",
  {
    metafield_input_rule_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    rule: {
      type: DataTypes.ENUM,
      values: Object.keys(metafield_input_rule_enums.rule),
      allowNull: false,
      unique: "metafield_input_rule_composite_index",
    },
    parameter: {
      type: Sequelize.TEXT,
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

module.exports = MetafieldInputRule;
