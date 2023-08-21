var express = require('express');
var router = express.Router();
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
