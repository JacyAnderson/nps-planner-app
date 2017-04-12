// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

