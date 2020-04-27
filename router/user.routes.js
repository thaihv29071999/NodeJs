var express = require('express');
var userController = require('../controllers/user.controller');

var router = express.Router();

// display user
router.get('/', userController.list);
// search user
router.get('/search', userController.search);
// create new user
router.get('/create', userController.create);// form create
router.post('/create', userController.postCreate);// get value from form create
// view user
router.get('/:id', userController.getId);

module.exports = router;