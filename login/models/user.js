const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        nick: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    });
};