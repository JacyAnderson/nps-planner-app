// PASSPORT.JS

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// Export PASSPORT
module.exports = function(passport) {


// Serializes user
passport.serializeUser(function(user, callback) {
	callback(null, user.id);
});

// Deserializes user
passport.deserializeUser(function(id, callback) {
	User.findById(id, function(err, user) {
		callback(err, user);
	});
});

// Sets signup strategy 
passport.use('local-signup', new LocalStrategy({
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true

// Adds user by email
}, function(req, email, password, callback) {
	User.findOne({'local.email' : email}, function(err, user) {
		if (err) return callback (err);

      // Returnes message that user email is already taken
      if (user) {
      	return callback(null, false, req.flash('signupMessage', 'This email is already in use.'));
      } else {
      	var newUser = new User();
      	newUser.local.email = email;
      	newUser.local.password = newUser.encrypt(password);


        // Saves new user
        newUser.save(function(err) {
        	if(err) throw err;
        	return callback(null, newUser);
        });
    }
});
}));


  // Sets login strategy
  passport.use('local-login', new LocalStrategy({
  	usernameField: 'email',
  	passwordField: 'password',
  	passReqToCallback: true
  }, function(req, email, password, callback) {

  	  // Finds user by email
  	  User.findOne({'local.email' : email}, function(err, user) {
  	  	if (err) {return callback(err);}
  	  	
           // if user does not exist, send message that no user has been found
           if(!user) {
           	return callback(null, false, req.flash('loginMessage', "No user found."));
           }

		   // if user inputs wrong passwords
		   if (!user.validPassword(password)) {
		   	return callback(null, false, req.flash('loginMessage', 'Incorrect Password'));
		   }

		   return callback(null, user);
		});
  	}));
};