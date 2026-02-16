const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { metafield_enums } = require("@databases/sequelize/enums");

const Metafield = sequelize.define(
  "metafield",
  {
    metafield_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    metafield_type: {
      type: DataTypes.ENUM,
      values: metafield_enums.metafield_type,
      allowNull: false,
    },

    entity: {
      type: DataTypes.ENUM,
      values: Object.keys(metafield_enums.entity),
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

module.exports = Metafield;
