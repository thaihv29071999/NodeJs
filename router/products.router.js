var express = require('express');

var controller = require('../controllers/products.controller');

var router = express.Router();

router.get('/', controller.listProduct);

module.exports = router;