var express = require('express');

var controller = require('../controllers/login.controller');

var validate = require('../middleware/user.middleware');

var router = express.Router();

router.get('/login', controller.login);

router.post('/login', controller.postLogin);


module.exports = router;
