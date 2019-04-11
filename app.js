// pull in modules for express
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

const sequelize = require('./utils/sequelize.js');

// pull in model(s)
const Product = require('./models/Product');
const Category = require('./models/Category');
const Tag = require('./models/Tag');
const ProductTag = require('./models/ProductTag');

// parsing middle-ware
app.use(express.urlencoded({extended:false}));

// pull in routes
const indexRoutes = require('./routes/index');
const productRouter = require('./routes/product');
const productAdminRouter = require('./routes/productAdmin');
const categoryRouter = require('./routes/category');


// set up static and pug
app.use(express.static('public'));
app.set('views',path.join(__dirname, "views"));
app.set('view engine', 'pug');

// use routes
app.use('/', indexRoutes);
app.use('/admin/product', productAdminRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);

sequelize.authenticate()
.then(() => {
  // successful
  console.log("Successfully authenticated.");
  app.listen(port);

  sequelize.sync()
    .then(()=>{
      console.log("Successfully synced the model");
    })
      .catch((err)=> {
        console.log("unable to sync model:", err);
      });
})
.catch((err) => {
  // not Successfully
  console.log("Could not authenticate:", err);
});
