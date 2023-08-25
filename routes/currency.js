var express = require("express");
var router = express.Router();

const currencyController = require("../controllers/currencyController");

router.get("/latestValue/:currency", currencyController.getLatestValue);

module.exports = router;
