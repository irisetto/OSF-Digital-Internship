var express = require("express");
var router = express.Router();

const categoryController = require("../controllers/categoryController");

const handlebars = require("hbs");

handlebars.registerHelper("ifeq", function (a, b, options) {
  if (a == b) {
    return options.fn(this);
  }
  return options.inverse(this);
});
handlebars.registerHelper("assign", function (varName, varValue, options) {
  if (!options.data.root) {
    options.data.root = {};
  }
  options.data.root[varName] = varValue;
});

router.get("/", categoryController.getCategory);

router.get("/:category", categoryController.getSubcategory);

router.get("/:category/:subcategory", categoryController.getProducts);

router.get("/:category/:subcategory/:productID", categoryController.getProduct);

module.exports = router;
