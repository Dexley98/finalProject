const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const Product = sequelize.define('product', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  productName : {
    type: Sequelize.STRING,
    allowNull: false
  },
  description : {
    type: Sequelize.STRING,
    allowNull: false
  },
  image : {
    // having some trouble understanding sequelizes datatypes from documentation
    // going to come back to this and try text and/or blob so that image's don't get cut off after limit.
    type: Sequelize.STRING,
    allowNull: false
  },
  price : {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
}); // lowercase and singular.

module.exports = Product;
