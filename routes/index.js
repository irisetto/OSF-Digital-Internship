var express = require('express');
var router = express.Router();

const retrieveDocument = async () => {
  const url = "mongodb+srv://cohmanteodora:student@osf-shop.xxyx0jj.mongodb.net/shop";
  const mongoose = require('mongoose')
  const connectionParams={
   useNewUrlParser: true,
  
   useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
   .then( () => {
       console.log('Connected to the database ')
   })
   .catch( (err) => {
       console.error(`Error connecting to the database. n${err}`);
   })

  const ProductModel = require('../models/product')
  return await ProductModel.findOne({id: '25720078'});
}

router.get('/', async function(req, res, next) {
  const product = await retrieveDocument();
 
  res.render('index', { title: 'OSF Shop'});
});

module.exports = router;
