const Sequelize = require('sequelize');
const sequelize = new Sequelize('my_exleyd2_default', 'my.exleyd2', 'Penguin56', {
  host: 'deltona.birdnest.org',   // ON CAMPUS
  //host: '127.0.0.1', // OFF CAMPUS
  dialect: 'mysql'
});

module.exports = sequelize;
