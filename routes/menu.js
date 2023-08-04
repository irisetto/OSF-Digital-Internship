const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs'); 

const handlebars = require('hbs')
const menu = fs.readFileSync('D:\\teo\\OSF\\views\\partials\\menu.hbs','utf8');
const head = fs.readFileSync('D:\\teo\\OSF\\views\\partials\\head.hbs','utf8');

   const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/shop');
  handlebars.registerPartial('menu', menu);
  handlebars.registerPartial('head', head);

console.log(menu);
router.use(async function(req, res, next) {
    try {
  const CategoryModel = require('../models/category')
  const allCategories = await CategoryModel.find({}, 'id name').lean();
  res.locals.categories = allCategories;
  next();
} catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
