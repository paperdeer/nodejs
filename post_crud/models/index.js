const Sequelize = require('sequelize');
const env = process.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Post = require("./post")(sequelize, Sequelize);

module.exports = db;