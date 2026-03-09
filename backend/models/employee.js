const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('employees', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hireDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Employee;