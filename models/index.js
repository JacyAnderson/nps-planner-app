var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/natParks");
var Park = require('./park');
var User = require('./user');

module.exports.Park = require("./park.js");
module.exports.user = require("./user.js");
