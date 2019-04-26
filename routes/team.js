const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Coach = require('../models/Coach');

router.get('/', (req , res) => {
  Team.findAll()
    .then((teams) => {
      res.render('team/index.pug', {teams: teams});
    })
      .catch((err) => {
        console.log('unable to get teams', err);
      });
  });

router.get('/:id', (req , res) => {
  const id = req.params.id;
  console.log('id is: ', id);
  Team.findByPk(id)
    .then((team) => {
      Player.findAll({
        where: {
          teamId: id,
        },
      })
        .then((players) => {
          Coach.findAll({
            where: {
              teamId: id,
            }
          })
            .then((coaches) => {
              res.render('team/team.pug', {
                team: team,
                players: players,
                coaches: coaches,
              });
            })
              .catch((coachErr) => {
                console.log('could not get coach info', coachErr);
              });
        })
          .catch((playerErr) => {
            console.log('could not get player info', playerErr);
          });
    })
      .catch((err) => {
        console.log('could not get team detail info.', err);
      });
});

module.exports = router;
