const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Team = require('./Team');

// const Product = require('./Product');

const Coach = sequelize.define('coach', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  coachName : {
    type: Sequelize.STRING,
    allowNull: false
  },
  image : {
    type: Sequelize.STRING,
    allowNull: false
  },
  bio : {
    type: Sequelize.TEXT,
    allowNull: false
  },
  stat1 : {
    type: Sequelize.STRING,
    allowNull: false
  },
  stat2 : {
    type: Sequelize.STRING,
    allowNull: false
  },
  stat3 : {
    type: Sequelize.STRING,
    allowNull: false
  }
}); // lowercase and singular.

Coach.belongsTo(Team);
Team.hasMany(Coach);


module.exports = Coach;
