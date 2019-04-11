const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Product = require('./Product');


const ProductTag = sequelize.define('ProductTag'); // lowercase and singular.

module.exports = ProductTag;
