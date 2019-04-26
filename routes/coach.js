const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Coach = require('../models/Coach');

router.get('/', (req , res) => {
  Coach.findAll()
    .then((coaches) => {
      Team.findAll()
        .then((teams) => {
          res.render('coaches/index.pug', { coaches: coaches, teams: teams});
        })
          .catch((teamErr) => {
            console.log('could not get teams', teamErr);
          });
      })
      .catch((err) => {
        console.log('unable to get coaches', err);
      });
  });

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Coach.findByPk(id)
    .then((coach) => {
      res.render('coaches/coach.pug', { coach: coach });
    }).catch((coachErr) => {
      console.log('Error getting coach detail.', coachErr);
    });
});

module.exports = router;
