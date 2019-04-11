const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Product  = require ('../models/Product');
const Tag = require ('../models/Tag');
const ProductTag = require('../models/ProductTag');

// this one got way gnarly
router.get('/:id', (req, res) => {
  const id = req.params.id

  Product.findByPk(id)
  .then((product) => {
    ProductTag.findAll({
      where: {
        productId: id
      }
    })
      .then((productTags) =>{
        // I'm concered with scalibility with this. I'm struggling to figure out how to get at what I want.
        // I feel as if the best option would be some sort of auto-generated get function through sequelize.
        Tag.findAll()
          .then((tags) => {
            res.render('product/product.pug', {
              product : product, // reflects individual proudct
              productTags: productTags, // reflects all tags for individual project
              tags:tags // holds information about all tags
            });
        })
      })
    })
});

router.get('category/:id', (req, res) => {
  const id = req.params.id
  Product.findAll({
    where: {
      categoryId: id
    }
  })
  .then((catQuery) => {
    res.render('category/index.pug', {catQuery : catQuery});
  })
});

// again, this is the same worry as before. However, I think it's much more efficent since entire tables aren't returned
/* I want to make this more efficent for the sake of scalibility but cannot find a way
to format a query in a way that gets at what I want.
*/

router.get('/tag/:id', (req, res) =>{
  const id = req.params.id
  Tag.findByPk(id)
    .then((tags) => {
      ProductTag.findAll({
        where: {
          tagId: id
        }
      })
        /* for this one, this is where I get a little lost. How can I search the Products
        table based on primary key, and store my answer in a promise callback,
        if I have multiple results in the set? Would it require iterating over the result set
        via a loop? Even more, could this whole problem be solved by a FK? */
        .then((productList) =>{
          Product.findAll(productList.productId) // I absolutely abhor having to do this since I know it's unwise for scalibility
            .then((products) =>{
              res.render('product/tag/tag.pug', {
                tags: tags,
                productList: productList,
                products: products
              });
            })
        })
    })
});

module.exports = router;
