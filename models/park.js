var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ParkSchema = new Schema ({
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
});

var Park = mongoose.model('Park', ParkSchema);

module.exports = Park;