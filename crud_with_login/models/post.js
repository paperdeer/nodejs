const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Post", {
        creator: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    })
};