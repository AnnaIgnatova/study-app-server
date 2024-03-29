const dbConfig = require('../../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: false,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.courses = require('./courses.model.js')(sequelize, Sequelize);
db.users = require('./users.model.js')(sequelize, Sequelize);
module.exports = db;
