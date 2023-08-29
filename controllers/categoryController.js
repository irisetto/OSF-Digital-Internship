const categoryFunctions = require("../mongoFunctions/categoryFunctions");
const productFunctions = require("../mongoFunctions/productFunctions");
const soapFunctions = require("./soap");

exports.getMenuCateg = async (req, res, next) => {
  try {
    const allCategories = await categoryFunctions.findAllCategories();
    res.locals.categories = allCategories;
    res.locals.projectTitle = "OSF Shop";
    next();
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await categoryFunctions.findCategoryById(req.root);
    res.render("category", {
      title: category?.name,
      category: category,
    });
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getSubcategory = async (req, res, next) => {
  const categoryID = req.params.category;
  try {
    const subcategory = await categoryFunctions.findSubcategory(
      req.root,
      categoryID
    );
    const category = await categoryFunctions.findCategoryById(req.root);

    res.render("subcategory", {
      rootRoute: category.id,
      linkCateg: category.name,
      title: `${category.name} ${subcategory.name}`,
      category: subcategory,
      subcategoryImg: subcategory.image,
    });
  } catch (err) {
    console.error("Error fetching subcategory:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getProducts = async (req, res, next) => {
  const categoryParam = req.params.category;

  const { subcategory } = req.params;
  try {
    const products = await productFunctions.findProductsBySubcategory(
      subcategory
    );
    const subcategoryName = await categoryFunctions.findCategoryName(
      req.root,
      categoryParam
    );
    const productsName = await categoryFunctions.findSubcategoryName(
      req.root,
      categoryParam,
      subcategory
    );
    const category = await categoryFunctions.findCategoryById(req.root);
    res.render("products", {
      title: productsName,
      rootRoute: category?.id,
      categoryName: category?.name,
      subcategoryName: subcategoryName?.name,
      subcategoryNameID: subcategoryName?.id,
      productsName: productsName,
      products: products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getProduct = async (req, res, next) => {
  const productID = req.params.productID;
  const subcategory = req.params.subcategory;
  const category = req.params.category;

  try {
    const product = await productFunctions.findProductById(productID);

    const productsName = await categoryFunctions.findSubcategoryName(
      req.root,
      category,
      subcategory
    );
   // const currencies = await soapFunctions.fetchAvailableCurrencies();
     const currencies = [
      'AED', 'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EGP',
      'EUR', 'GBP', 'HUF', 'INR', 'JPY', 'KRW', 'MDL', 'MXN', 'NOK', 'NZD',
      'PLN','RON', 'RSD', 'RUB', 'SEK', 'THB', 'TRY', 'UAH', 'USD', 'XAU', 'XDR', 'ZAR'
    ]; 
    res.render("product", {
      title: product.name,
      subcategName: productsName,
      product: product,
      currencies: currencies,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
};
