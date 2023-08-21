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
const handlebars = require('hbs')

handlebars.registerHelper('ifeq', function (a, b, options) {
  if (a == b) { return options.fn(this); }
  return options.inverse(this);
});
handlebars.registerHelper('assign', function (varName, varValue, options) {
  if (!options.data.root) {
      options.data.root = {};
  }
  options.data.root[varName] = varValue;
});
const retrieveDocument = async () => {
  return await CategoryModel.findOne({ id: "mens" });
};
router.get("/", async function (req, res, next) {
  const category = await retrieveDocument();
  console.log(category);
  res.render("category", {
    title: "Men",
    projectTitle: "Shop",
    category: category,
  });
});

router.get("/:category", async function (req, res, next) {
  const categoryID = req.params.category;
  const category = await CategoryModel.findOne(
    { id: "mens", categories: { $elemMatch: { id: categoryID } } },
    { "categories.$": 1 }
  ).lean();
  if (!category || !category.categories || !category.categories[0]) {
    // Handle category not found
    return res.status(404).send("Category not found");
  }

  const subcategory = category.categories[0];
  res.render("subcategory", {
    rootRoute: "mens",
    linkCateg: "Mens",
    title: `Men ${subcategory.name}`,
    projectTitle: "Shop",
    category: subcategory,
    subcategoryImg: subcategory.image,
  });
});

router.get("/:category/:subcategory", async function (req, res, next) {
  const category = req.params.category;

  const { subcategory } = req.params;
  try {
    const products = await ProductModel.find({
      primary_category_id: subcategory,
    }).lean();
 

    const subcategoryName = await CategoryModel.aggregate([
      {
        $match: {
          id: "mens",
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
    console.log("Subcategory Names:", subcategoryName);

    const linkSubcateg = subcategoryName[0]?.subcategoryName;
    const categoryName = await CategoryModel.findOne(
      { id: "mens", categories: { $elemMatch: { id: category } } },
      { "categories.$": 1 }
    ).lean();
    const linkCateg2 = categoryName?.categories[0];
  
    res.render("products", {
      projectTitle: "Shop",
      title: linkSubcateg,
      rootRoute: "mens",
      linkCateg: "Mens",
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
          id: "mens",
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
