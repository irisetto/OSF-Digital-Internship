var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/shop');
  const CategoryModel = require('../models/category');

/* GET home page. */
router.get('/:categoryID', async function(req, res, next) {
    const categoryID = req.params.categoryID;
    console.log(categoryID)
    const category = await CategoryModel.findOne({ id: `${categoryID}` }).lean();
    if (!category) {
      // Handle category not found
      return res.status(404).send('Category not found');
    }
  
  res.render('category', { title:'Men',projectTitle: 'Shop', category: category});
});

module.exports = router;
