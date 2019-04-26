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
    type: Sequelize.TEXT,
    allowNull: false
  },
  record : {
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


module.exports = Team;
