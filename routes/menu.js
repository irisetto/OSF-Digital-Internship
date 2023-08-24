const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs'); 
const categoryController = require("../controllers/categoryController");

const handlebars = require('hbs')
const viewsDirectory = path.resolve(__dirname, '..');
const menuPath = path.join(viewsDirectory, 'views', 'partials', 'menu.hbs');
const headPath = path.join(viewsDirectory, 'views', 'partials', 'head.hbs');
const footerPath = path.join(viewsDirectory, 'views', 'partials', 'footer.hbs');

const menu = fs.readFileSync(menuPath, 'utf8');
const head = fs.readFileSync(headPath, 'utf8');
const footer = fs.readFileSync(footerPath, 'utf8');

  handlebars.registerPartial('menu', menu); 
  handlebars.registerPartial('footer', footer);
  handlebars.registerPartial('head', head);
  
router.use(categoryController.getMenuCateg);

module.exports = router;
