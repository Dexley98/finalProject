const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Product = require ('../models/Team');
const Category = require ('../models/Category');
const Team = require ('../models/Team.js');

router.get('/', (req,res)=>{
  /*
  Product.findAll()
  .then((products) =>{
    Category.findAll()
    .then((cats) =>{
      res.render('index.pug', {products: products, cats: cats});
    })
      .catch((err) =>{
        console.log('Error getting cats', err);
      });
  })
    .catch((err) =>{
      console.log('Error getting products', err);
    });

*/
  Team.findAll()
    .then((teams) => {
      console.log('HERES THOSE TEAMS' + teams);
      res.render('index.pug', {teams: teams});

    })
    .catch((err) =>{
      console.log('unable to get teams');
    });
});

module.exports = router;
