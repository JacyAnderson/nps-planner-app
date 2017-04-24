var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var User = mongoose.Schema({
	local : {
		email        : String,
		password     : String,
		userParks    :[{
			name: String,
			fullName: String,
			states : String,
			parkCode : String,
			designation : String,
			description : String,
			weatherInfo : String,
			latLong : String,
			directionsInfo : String,
			directionsUrl : String,
			url : String
		}]
	}
});

User.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);