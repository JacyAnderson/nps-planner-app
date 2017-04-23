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

//user routes
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

// Park routes
// Get home page
router.route('/')
	.get(parkControllers.getParkIndex)

// Getting ALL parks
router.route('/parks')
  .get(parkControllers.getParks)

// Get parks by state
router.route('/parks/:state')
  .get(parkControllers.getParksByState)

// Get a single park
router.route('/parks/code/:parkCode') 
  .get(parkControllers.getByParkCode)

// Edit a single parks directionsUrl
router.route('parks/code/:parkCode')
  .put(parkControllers.editByParkCode)


// API ROUTES


// Adds all parks to API
router.route('/api/parks')
  .get(parkControllers.populateApi)

router.route('/alerts/:parkCode')
  .get(parkControllers.getAlerts)


// function authenticated
  
module.exports = router;