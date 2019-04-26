const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const Team = sequelize.define('team', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  teamName : {
    type: Sequelize.STRING,
    allowNull: false
  },
  teamLogo : {
    type: Sequelize.STRING,
    allowNull: false
  },
  history : {
    type: Sequelize.STRING,
    allowNull: false
  },
  record : {
    type: Sequelize.STRING,
    allowNull: false
  },
  touchdowns : {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  totalYards : {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  player1 : {
    type: Sequelize.STRING,
    allowNull: false
  },
  player2 : {
    type: Sequelize.STRING,
    allowNull: false
  },
  player3 : {
    type: Sequelize.STRING,
    allowNull: false
  },
  coach1 : {
    type: Sequelize.STRING,
    allowNull: false
  },
  coach2 : {
    type: Sequelize.STRING,
    allowNull: false
  },
  coach3 : {
    type: Sequelize.STRING,
    allowNull: false
  },
}); // lowercase and singular.


module.exports = Team;
