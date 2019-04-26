const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Team = require ('../models/Team');

router.get('/', (req,res)=>{

  Team.findAll()
    .then((teams) => {
      console.log('HERES THOSE TEAMS' + teams);
      res.render('index.pug', {teams: teams});

    })
    .catch((err) =>{
      console.log('unable to get teams');
    });
});


router.get('/logout', (req, res) => {

});


module.exports = router;
