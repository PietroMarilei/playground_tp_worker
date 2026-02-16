const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("@databases/sequelize/sequelize.js");

// Enums
const { discount_enums } = require("@databases/sequelize/enums");

const ReservationDiscount = sequelize.define(
  "reservation_discount",
  {
    reservation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.keys(discount_enums.type),
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
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

module.exports = ReservationDiscount;
