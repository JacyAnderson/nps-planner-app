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





// Park API ROUTES

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

// router.route('/api/parks/:park')
//   .post(parkControllers.parkCreate)

  // User API routes

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



// ALERTS routes (external)


router.route('/alerts/:parkCode')
  .get(parkControllers.getAlerts)
  
module.exports = router;