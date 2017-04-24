var passport = require("passport");

// Get /signup 
function getSignup(request, response, next) {
	response.render('signup.ejs', { message: request.flash('signupMessage')});
}

// POST /signup 
function postSignup(request, response, next) {
	console.log("In signup!");
	var signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});

	return signupStrategy(request, response, next);
}

// Get /login
function getLogin(request, response, next) {
	response.render('login.ejs', {message: request.flash('loginMessage')});
}

// POST /login 
function postLogin(request, response, next) {
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});

	return loginStrategy(request, response, next);
}

// GET /logout
function getLogout(request, response) {
	request.logout();
	response.redirect('/');
}

// Restricted page
function secret(request, response) {
}

// Modules to export for use elsewhere
module.exports = {
	getLogin: getLogin,
	postLogin: postLogin,
	getSignup: getSignup,
	postSignup: postSignup,
	getLogout: getLogout,
	secret: secret
}