var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/shop');
  const CategoryModel = require('../models/category')
  const ProductModel = require('../models/product');


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
  res.render('subcategory', { rootRoute:"mens",linkCateg:"Mens",title:`Men ${subcategory.name}`,projectTitle: 'Shop', category: subcategory, subcategoryImg: subcategory.image});
});


router.get('/:category/:subcategory', async function(req, res, next) {
  const { subcategory } = req.params;  
  try {
    const products = await ProductModel.find({ primary_category_id: subcategory}).lean();
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
