const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Product = require('./Product');

const Category = sequelize.define('category', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  categoryName : {
    type: Sequelize.STRING,
    allowNull: false
  }
}); // lowercase and singular.

Product.belongsTo(Category); 
Category.hasOne(Product);

module.exports = Category;
