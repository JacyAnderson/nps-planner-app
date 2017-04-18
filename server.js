// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request =require("request");
var baseUrl = "https://developer.nps.gov/api/v0/";
var authorizationHeader = "Authorization:" + api_key;
var authorization = "Authorization";
var api_key = process.env.NPS_KEY;
var url = 'https://developer.nps.gov/api/v0/parks?parkCode=romo';

var options = {
  url: url,
  headers: {
    Authorization:api_key
  }
};

console.log(options);

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

app.get('/', function(req, res) {
	console.log("Making get request at Index");
  console.log("Your api_key is: " + api_key);	
	request(options, function(err, response, body) {
    console.log("In request");
    if (!err && response.statusCode == 200) {
      console.log('Here comes dat boi!!!');
      var info = JSON.parse(body);
      res.json(info);
    } else if (!err && response.statusCode != 200) {
      console.log("There is an error");
      console.log(body);
    } 
    else if(err) {
      console.log("Error incoming");
      console.log(err);
      res.send("FAILURE");
    } 
    // var park = JSON.parse(body);
    // console.log("Oh shit whaddup!");
    // res.send(park);
  });
});

// app.get(authorizationHeader + '@https://developer.nps.gov/api/v0/parks?parkCode=romo', function(req, res) {
  
// });

// START THE SERVER
// ==============================================================================
app.listen(port);
console.log('listening on port ' + port);