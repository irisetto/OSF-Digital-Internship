var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/shop');
  const CategoryModel = require('../models/category')
const retrieveDocument = async () => {
  
  return await CategoryModel.findOne({id: 'mens'});
}
router.get('/', async function(req, res, next) {
  const category = await retrieveDocument();
  console.log(category)
  res.render('category', { title:'Men',projectTitle: 'Shop', category: category});
});

router.get('/:category', async function(req, res, next) {
  const categoryID = req.params.category;
  const category = await CategoryModel.findOne(
    { id: 'mens' ,
      categories:{$elemMatch:{id:categoryID}}
    },
    { "categories.$": 1 }
    ).lean();
  const subcategory = category.categories[0];
  res.render('subcategory', { title:`Men ${subcategory.name}`,projectTitle: 'Shop', category: subcategory, subcategoryImg: subcategory.image});
});

module.exports = router;