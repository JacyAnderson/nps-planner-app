// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request =require("request");
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var exec = require('child_process').exec;
var cmd = 'curl -X GET \
  https://developer.nps.gov/api/v0/parks?parkCode=romo\
  -H "authorization: C7D61596-3FA5-47EA-906D-202B2B3ECA00" \
  -H "cache-control: no-cache"';
var authorization = "Authorization";
var api_key = process.env.NPS_KEY;
var url = 'https://developer.nps.gov/api/v0/parks';
// var url = 'https://developer.nps.gov/api/v0/alerts?parkCode=yell,yose';

 
// var options = {
//   url: url,
//   headers: {
//     'Authorization': api_key
//   }
// };

// console.log(options);

app.use(morgan('dev')); 
app.use(cookieParser());

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./config/passport')(passport);

app.use(function(req, res, next) {
  res.locals.currentUser=req.user;
  next();
});

var routes = require('./config/routes');
app.use(routes);

var port = process.env.PORT || 3000;

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();



// GET all National Parks
app.get('/parks', function(req, res) {

	console.log("Making get request at Index");
    console.log("Your api_key is: " + api_key);	
    
    exec(cmd, function(err, stdout, stderr) {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
      res.send(stdout);
    });
	// request(options, function(err, response, body) {
 //    console.log("In request");
 //    if (!err && response.statusCode == 200) {
 //      console.log('Here comes dat boi!!!');
 //      var info = JSON.parse(body);
 //      res.json(info);
 //    } else if (!err && response.statusCode != 200) {
 //      console.log("There is an error");
 //      console.log(body);
 //      console.log("The error is a " + response.statusCode);
 //      res.send(body);
 //    } else if(err) {
 //      console.log("Error incoming");
 //      console.log(body);
 //      res.send("FAILURE");
 //    } 
  // });
});


// START THE SERVER
// ==============================================================================
app.listen(port);
console.log('listening on port ' + port);