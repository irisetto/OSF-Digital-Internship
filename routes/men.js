var express = require('express');
var router = express.Router();

const retrieveDocument = async () => {
  var mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/shop');
  const CategoryModel = require('../models/category')
  return await CategoryModel.findOne({id: 'mens'});
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  const menCategory = await retrieveDocument();
  console.log(menCategory)
  res.render('mens', { title:'Men',projectTitle: 'Shop', menCategory: menCategory});
});

module.exports = router;
