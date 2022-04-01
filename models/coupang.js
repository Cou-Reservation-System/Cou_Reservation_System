'use strict';
const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Coupang extends Model {
        static associate(models) {
        
        }
    }
    Coupang.init(
        {
            CoupangId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            name: {
                allowNull: false,
                type: Sequelize.STRING(20),
            },

            carNumber: {
                allowNull: false,
                type: Sequelize.STRING(13),
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
            }
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'Coupang',
        },
    );
    return Coupang;
};