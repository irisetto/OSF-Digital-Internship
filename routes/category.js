var express = require('express');
var router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cohmanteodora:student@osf-shop.xxyx0jj.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
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
