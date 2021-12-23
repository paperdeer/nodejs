const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nickName: {
            type: DataTypes.STRING(15),
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            primaryKey: false,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    })
}