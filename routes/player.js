const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Coach = require('../models/Coach');

router.get('/', (req , res) => {
  Player.findAll()
    .then((players) => {
      Team.findAll()
        .then((teams) => {
          res.render('players/index.pug', {players: players, teams: teams});
        })
          .catch((teamErr) => {
            console.log('could not get teams', teamErr);
          });
      })
      .catch((err) => {
        console.log('unable to get players', err);
      });
  });

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Player.findByPk(id)
    .then((player) => {
      res.render('players/player.pug', { player: player });
    }).catch((playerErr) => {
      console.log('Error getting player detail.', playerErr);
    });
  });

module.exports = router;
