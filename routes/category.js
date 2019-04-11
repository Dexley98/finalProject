const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Product = require ('../models/Product');
const Category = require ('../models/Category');

router.get('/:id', (req, res) => {
  const id = req.params.id
  Product.findAll({
    where: {
      categoryId: id
    }
  })
    .then((catQuery) => {
      Category.findByPk(id).then((catInfo)=>{
        res.render('category/index.pug', {catQuery : catQuery, catInfo: catInfo});
      })
    })
});

module.exports = router;
