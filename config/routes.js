// ROUTES.JS PAGE

// REQUIRE ALL THE THINGS
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');

// REQUIRE CONTROLLERS
var usersController = require('../controllers/users');
var parkControllers = require('../controllers/parkControllers');
var staticsController = require('../controllers/statics');


// AUTHETICATES USER
function authenticatedUser(req, res, next) {
//if user is authenticated, we continue
    if (req.isAuthenticated()) return next();
    //otherwise req is redirected to home
    res.redirect('/login');
}

// USER ROUTES
// ======================================================================
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





// PARK API ROUTES
// ======================================================================
// GET home page
router.route('/')
	.get(parkControllers.getParkIndex)

// GET parks by state
router.route('/api/parks/state/:state')
  .get(parkControllers.getParksByState)

// GET all parks
router.route('/api/parks')
  .get(parkControllers.populateApi)

// SHOW a single park
router.route('/api/parks/:parkCode') 
  .get(parkControllers.getByParkCode)
  .put(parkControllers.updateUserByParkCode)

// PUT Edit a single parks directionsUrl
router.route('/api/parks/:parkCode')
  .put(parkControllers.editByParkCode)

// USER API ROUTES
// ======================================================================

// Get all users
router.route('/api/user')
  .get(parkControllers.getAllUsers)

// Get ONE user and update one user's parks (not functional)
router.route('/api/user/:id')
  .get(parkControllers.getUser)
  .put(authenticatedUser, parkControllers.updateUserPark)


// Delete a user
router.route('api/user/:id')
  .delete(parkControllers.deleteUser)



// ALERTS ROUTES
// ======================================================================
router.route('/alerts/:parkCode')
  .get(parkControllers.getAlerts)

// Modules to export
module.exports = router;