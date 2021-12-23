const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {}

const sequelize = new Sequelize(
    config.database,
    config.userId,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);

module.exports = db;