var express = require('express');
var router = express.Router();

const retrieveDocument = async () => {
  var mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/shop');
  const ProductModel = require('../models/product')
  return await ProductModel.findOne({id: '25720078'});
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  const product = await retrieveDocument();
  console.log(product)
  console.log(product.image_groups[0].images[0].link)
  res.render('index', { title: 'Express', product: product, productImg: 'images/' + product.image_groups[0].images[0].link});
});

module.exports = router;
