const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
            }
        }
  },
  type: {
    type: DataTypes.STRING,
    enum: ['admin', 'user'],
    defaultValue: 'user',
  },
});

module.exports = User;
