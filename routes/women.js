var express = require("express");
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

const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");

const retrieveDocument = async () => {
  return await CategoryModel.findOne({ id: "womens" });
};

router.get("/", async function (req, res, next) {
  const category = await retrieveDocument();
  console.log(category);
  res.render("category", {
    title: "Women",
    projectTitle: "Shop",
    category: category,
  });
});

router.get("/:category", async function (req, res, next) {
  const categoryID = req.params.category;
  const category = await CategoryModel.findOne(
    { id: "womens", categories: { $elemMatch: { id: categoryID } } },
    { "categories.$": 1 }
  ).lean();
  const subcategory = category?.categories[0];
  res.render("subcategory", {
    rootRoute: "womens",
    linkCateg: "Womens",
    title: `Women ${subcategory?.name}`,
    projectTitle: "Shop",
    category: subcategory,
    subcategoryImg: subcategory?.image,
  });
});

router.get("/:category/:subcategory", async function (req, res, next) {
  const category = req.params.category;

  const { subcategory } = req.params;
  try {
    const products = await ProductModel.find({
      primary_category_id: subcategory,
    }).lean();
    if (!products || products.length === 0) {
      return res.status(404).send("No products found for this subcategory");
    }
    const subcategoryName = await CategoryModel.aggregate([
      {
        $match: {
          id: "womens",
        },
      },
      {
        $unwind: "$categories", // Unwind the first level of categories array
      },
      {
        $unwind: "$categories.categories", // Unwind the second level of categories array
      },
      {
        $match: {
          "categories.id": category,
          "categories.categories.id": subcategory,
        },
      },
      {
        $project: {
          _id: 0,
          subcategoryName: "$categories.categories.name",
        },
      },
    ]);
    const linkSubcateg = subcategoryName[0].subcategoryName;
    const categoryName = await CategoryModel.findOne(
      { id: "womens", categories: { $elemMatch: { id: category } } },
      { "categories.$": 1 }
    ).lean();
    const linkCateg2 = categoryName.categories[0];
    res.render("products", {
      projectTitle: "Shop",
      title: linkSubcateg,
      rootRoute: "womens",
      linkCateg: "Womens",
      linkCateg2: linkCateg2?.name,
      linkCateg2ID: linkCateg2?.id,
      linkSubcateg: linkSubcateg,
      products: products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/:category/:subcategory/:productID", async function (req, res, next) {
  const productID = req.params.productID;
  const subcategory = req.params.subcategory;
  const category = req.params.category;

  try {
    const product = await ProductModel.findOne({
      id: productID,
    }).lean();

    const subcategoryName = await CategoryModel.aggregate([
      {
        $match: {
          id: "womens",
        },
      },
      {
        $unwind: "$categories", // Unwind the first level of categories array
      },
      {
        $unwind: "$categories.categories", // Unwind the second level of categories array
      },
      {
        $match: {
          "categories.id": category,
          "categories.categories.id": subcategory,
        },
      },
      {
        $project: {
          _id: 0,
          subcategoryName: "$categories.categories.name",
        },
      },
    ]);

    const linkSubcateg = subcategoryName[0]?.subcategoryName;

    res.render("product", {
      projectTitle: "Shop",
      title: product.name,
      subcategName:linkSubcateg,
      product: product,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
