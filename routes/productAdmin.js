const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Product  = require ('../models/Product');
const Category = require ('../models/Category');
const Tag = require ('../models/Tag');
const ProductTag = require('../models/ProductTag');


// 'home' for admin/product controller
router.get('/', (req,res)=>{
  Product.findAll()
  .then((products) =>{
    res.render('admin/product/index', {products: products});
  })
  .catch((err) =>{
    console.log('Error getting products', err);
  });
});


// edit controller
router.get('/edit/:id', (req,res) =>{
  const id = req.params.id;
  Product.findByPk(id)
  .then((product) => {
    Category.findAll()
      .then((categories) =>{
        Tag.findAll()
          .then((tags) =>{
            res.render('admin/product/edit', {
              product : product,
              categories : categories,
              tags: tags
            });
          })
      })
  })
});

router.post('/edit/:id', (req,res) =>{
  const id = req.params.id;
  const tags = req.body.tags;
  console.log(tags);
  Product.findByPk(id)
  .then((product) => {
    product.productName = req.body.productName;
    product.description = req.body.description;
    product.image = req.body.image;
    product.price = req.body.price;
    product.categoryId = req.body.dropDown;
    product.addTags(req.body.tags)
      .then(() =>{
        product.save().then(() =>{
          res.redirect('/admin/product/'+id);
        });
      })
  })
}); // end edit controller(s)

// new product controller
router.get('/new', (req,res)=>{
  Category.findAll()
    .then((categories) =>{
      Tag.findAll()
        .then((tags) =>{
          res.render('admin/product/new', {
            categories: categories,
            tags: tags
          });
        })
    })
});

router.post('/new', (req,res)=>{
  // req.body.fristName
  Product.create({
    productName : req.body.productName,
    description : req.body.description,
    image : req.body.image,
    price : req.body.price
  })
  .then((product)=>{ // product successfully created
    // now we need to set cat
    product.setCategory(req.body.dropDown)
      .then(() =>{
        product.addTags(req.body.tags)
          .then(() => {
            res.redirect('/admin/product/');
          })
      })
  })
    .catch((err) =>{
      console.log('Error saving product', err);
      alert("Sorry, There was an error submitting your product. Check your fields and try again.");
    });
}); // end new product controller.

//dynamic controller based on product id.
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
        Tag.findAll()
          .then((tags) =>{
            res.render('admin/product/product', {
              product : product,
              productTags: productTags,
              tags: tags
            });
          })
      })
  })
});

// delete  product controller.
router.post('/delete', (req, res) => {
  const id = req.body.id
  Product.findByPk(id)
  .then((product) => {
    product.destroy()
    .then(()=>{
      res.redirect('/admin/product');
    });
  });
});

module.exports = router;
