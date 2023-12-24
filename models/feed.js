const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Feed = db.define('feed', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addedBy: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
    enum: ["pending", "verified", "rejected"],
    defaultValue: 'pending'
  }
});

module.exports = Feed;
