const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Team = require('./Team');

// const Product = require('./Product');

const Player = sequelize.define('player', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  playerName : {
    type: Sequelize.STRING,
    allowNull: false
  },
  bio : {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image : {
    type: Sequelize.STRING,
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

Player.belongsTo(Team);
Team.hasMany(Player);


module.exports = Player;
