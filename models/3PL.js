"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TPL extends Model {
    static associate(models) {}
  }
  TPL.init(
    {
      TPLId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      departure: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },

      carNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      phoneNumber: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      amountPallet: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      carType: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      DateAndTime: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      isDone: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "TPL",
      tableName: "3PL",
    }
  );
  return TPL;
};
