
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/shop');
  const CategoryModel = require('../models/category')
  const ProductModel = require('../models/product');



router.get('/:category/:subcategory', async function(req, res, next) {
    const subcategoryID = req.params.subcategory;
    console.log(subcategoryID);

    try {
      const products = await ProductModel.find({ primary_category_id: subcategoryID}).lean();
      if (!products || products.length === 0) {
        return res.status(404).send('No products found for this subcategory');
      }
      console.log(products);
      res.render('products', { title: subcategory, products: products });
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Internal Server Error');
    }
  
  });
  module.exports = router;