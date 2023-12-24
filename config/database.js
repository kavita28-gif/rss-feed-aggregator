const { Sequelize } = require('sequelize');
const { development } = require('./config');

console.log(development.database, development.username, development.password)

const db = new Sequelize(development.database, development.username, development.password, {
  host: development.host,
  dialect: 'mysql',
  operatorsAliases: false,
    
  pool: {
      max: development.max,
      min: development.min,
      acquire: development.acquire,
      idle: development.idle
  },
  define: {
    scopes: {
      excludeCreatedAtUpdateAt: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    },
    timestamps: false
  }
});

module.exports = db;