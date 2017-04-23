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
// require commandline
var exec = require('child_process').exec;
var db = require('./models');

mongoose.createConnection('mongodb://localhost/natParks');

// VARIABLES
// =============================================================================

// API Key located in .env
var api_key = process.env.NPS_KEY;

var version = "v0";

var cmdParks = 'curl -X GET \
  https://developer.nps.gov/api/' + version + '/parks?stateCode=CO\
  -H "authorization: "' + api_key +'\
  -H "cache-control: no-cache"';

// MIDDLEWARE

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



// START THE SERVER
// ==============================================================================
app.listen(port);
console.log('listening on port ' + port);