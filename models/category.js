const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categories: [{
        categories: [{
            id: String,
            name: String,
            image: String,
            page_description: String,
            page_title: String,
            parent_category_id: String,
            c_showInMenu: Boolean
        }],
        id: String,
        image: String,
        name: String,
        page_description: String,
        page_title: String,
        parent_category_id: String,
        c_showInMenu: Boolean
    }],
    id: {
        type: String
    },
    name: {
        type: String
    },
    page_description: {
        type: String
    },
    page_title: {
        type: String
    },
    parent_category_id: {
        type: String
    },
    c_showInMenu: {
        type: Boolean
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;