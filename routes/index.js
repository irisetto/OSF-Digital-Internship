var express = require('express');
var router = express.Router();

const retrieveDocument = async () => {

  const ProductModel = require('../models/product')
  return await ProductModel.findOne({id: '25720078'});
}

router.get('/', async function(req, res, next) {
  const product = await retrieveDocument();
 
  res.render('index', { title: 'OSF Shop'});
});

module.exports = router;
