const CategoryModel = require("../models/category");

exports.findAllCategories = async () => {
  try {
    return await CategoryModel.find({}).lean();
  } catch (err) {
    console.error("Error fetching categories:", err);
    throw err;
  }
};

exports.findCategoryById = async (doc_id) => {
  try {
    return await CategoryModel.findOne({ id: doc_id });
  } catch (err) {
    console.error("Error fetching category:", err);
    throw err;
  }
};

exports.findSubcategory = async (doc_id, categoryID) => {
  try {
    const category = await CategoryModel.findOne(
      { id: doc_id, categories: { $elemMatch: { id: categoryID } } },
      { "categories.$": 1 }
    ).lean();
    return category.categories[0];
  } catch (err) {
    console.error("Error fetching subcategory:", err);
    throw err;
  }
};
exports.findSubcategoryName = async (categoryID, category, subcategory) => {
  try {
    const subcategoryName = await CategoryModel.aggregate([
      {
        $match: {
          id: categoryID,
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
    return subcategoryName[0]?.subcategoryName;
  } catch (err) {
    console.error("Error fetching subcategory name:", err);
    throw err;
  }
};

exports.findCategoryName = async (categoryID, category) => {
  try {
    const categoryName = await CategoryModel.findOne(
      { id: categoryID, categories: { $elemMatch: { id: category } } },
      { "categories.$": 1 }
    ).lean();
    return categoryName?.categories[0];
  } catch (err) {
    console.error("Error fetching category name:", err);
    throw err;
  }
};
