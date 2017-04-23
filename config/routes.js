var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var usersController = require('../controllers/users');
var parkControllers = require('../controllers/parkControllers');
var staticsController = require('../controllers/statics');

function authenticatedUser(req, res, next) {
//if user is authenticated, we continue
    if (req.isAuthenticated()) return next();
    //otherwise req is redirected to home
    res.redirect('/login');
}

router.route('/')
  .get(staticsController.home);

router.route('/parks')
  .get(staticsController.parks);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/logout')
  .get(usersController.getLogout)

router.route('/myParks')
  .get(authenticatedUser, staticsController.myParks)

// function authenticated
  
module.exports = router;