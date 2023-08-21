const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs'); 
const handlebars = require('hbs')
const viewsDirectory = path.resolve(__dirname, '..');
const menuPath = path.join(viewsDirectory, 'views', 'partials', 'menu.hbs');
const headPath = path.join(viewsDirectory, 'views', 'partials', 'head.hbs');
const footerPath = path.join(viewsDirectory, 'views', 'partials', 'footer.hbs');

const menu = fs.readFileSync(menuPath, 'utf8');
const head = fs.readFileSync(headPath, 'utf8');
const footer = fs.readFileSync(footerPath, 'utf8');

   const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/shop');
  handlebars.registerPartial('menu', menu); 
  handlebars.registerPartial('footer', footer);
  handlebars.registerPartial('head', head);
 
  // const { MongoClient, ServerApiVersion } = require('mongodb');
  // const uri = "mongodb+srv://cohmanteodora:student@osf-shop.xxyx0jj.mongodb.net/?retryWrites=true&w=majority";
  // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  // const client = new MongoClient(uri, {
  //   serverApi: {
  //     version: ServerApiVersion.v1,
  //     strict: true,
  //     deprecationErrors: true,
  //   }
  // });
  // async function run() {
  //   try {
  //     // Connect the client to the server	(optional starting in v4.7)
  //     await client.connect();
  //     // Send a ping to confirm a successful connection
  //     await client.db("admin").command({ ping: 1 });
  //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
  //   } finally {
  //     // Ensures that the client will close when you finish/error
  //     await client.close();
  //   }
  // }
  // run().catch(console.dir);
  const CategoryModel = require('../models/category')

router.use(async function(req, res, next) {
    try {
  
  const allCategories = await CategoryModel.find({c_showInMenu:true}).lean();
  res.locals.categories = allCategories;
  next();
} catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
