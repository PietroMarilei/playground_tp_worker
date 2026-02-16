const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

const ComponentFulltext = sequelize.define(
  "component_fulltext",
  {
    component_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },

    component_fulltext: {
      type: DataTypes.TEXT
    },
    version_fulltext: {
      type: DataTypes.TEXT
    },
    entry_fulltext: {
      type: DataTypes.TEXT
    },
    vehicle_fulltext: {
      type: DataTypes.TEXT
    },
    manufacturer_fulltext: {
      type: DataTypes.TEXT
    }
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: false
  }
);

module.exports = ComponentFulltext;
