var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI ||
					process.env.MONGOLAB_URI ||
					process.env.MONGOHQ_URL ||
					"mongodb://localhost/natParks");
var Park = require('./park');
var User = require('./user');

module.exports.Park = require("./park.js");
module.exports.User = require("./user.js");
