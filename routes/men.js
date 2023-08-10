var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shop");
const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");

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
    const modifiedProducts = products.map((product) => {
      // Access the nested property and assign it to a new property
      product.imageLink = product.image_groups[2].images[0].link;
      return product;
    });

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
    console.log(modifiedProducts);
    res.render("products", {
      projectTitle: "Shop",
      title: linkSubcateg,
      linkCateg: "Mens",
      linkCateg2: linkCateg2?.name,
      linkSubcateg: linkSubcateg,
      products: products,
      productImg:modifiedProducts.imageLink,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
