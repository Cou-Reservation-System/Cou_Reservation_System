'use strict';
const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        static associate(models) {
        
        }
    }
    Admin.init(
        {
            adminId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            id: {
                allowNull: false,
                type: Sequelize.STRING(30),
            },

            password: {
                allowNull: false,
                type: Sequelize.STRING(30),
            },

        },
        {
            sequelize,
            timestamps: true,
            modelName: 'Admin',
        },
    );
    return Admin;
};