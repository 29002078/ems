const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ems_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;