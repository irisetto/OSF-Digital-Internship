const ProductModel = require("../models/product");

exports.findProductsBySubcategory = async (subcategoryID) => {
  try {
    return await ProductModel.find({
      primary_category_id: subcategoryID,
    }).lean();
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

exports.findProductById = async (productID) => {
  try {
    return await ProductModel.findOne({
      id: productID,
    }).lean();
  } catch (err) {
    console.error("Error fetching product:", err);
    throw err;
  }
};
