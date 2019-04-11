const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Product = require ('../models/Product');
const Category = require ('../models/Category');

router.get('/', (req,res)=>{
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
});

module.exports = router;
