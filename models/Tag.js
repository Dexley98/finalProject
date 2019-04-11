const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Product = require('./Product');
const ProductTag = require('./ProductTag');

const Tag = sequelize.define('tag', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  tagName : {
    type: Sequelize.STRING,
    allowNull: false
  }
}); // lowercase and singular.

Product.belongsToMany(Tag, {through: ProductTag});
Tag.belongsToMany(Product, {through: ProductTag});

module.exports = Tag;
