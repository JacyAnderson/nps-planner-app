var db = require('../models');
var User = require('../models/user')


// require commandline
var exec = require('child_process').exec;
// API Key located in .env
var api_key = process.env.NPS_KEY;
var version = "v0";

// USER ROUTES

function getAllUsers(req, res) {
  console.log('getting all users');
  db.User.find({}, function(err, users) {
    res.json(users);
  });
};  

function getUser(req, res) {
  console.log('accessing user db');
  db.User.find({_id: req.params.id}, function(err, res) {
    console.log("finding user");
    var user = res;
    console.log(user);
    console.log(user[0].local.userParks);
    var userParks = user[0].local.userParks;
  });
};  

function updateUserPark(req, res, next) {
  console.log('in addMyParks function');
  console.log('req', req);
  var userId = req.user._id;
  console.log('this users ID is: ' + userId);
  db.User.find({_id: req.user._id}, function(req, user, res, err) {
    // var userParks = user[0].local.userParks;
    console.log(user[0]);
    console.log(user[0].local.userParks); 

    
    // if (err) {
    //   res.send('could not find user because: ' + err);
    // } else {
    //   user[0].local.userParks.fullName = req.fullName; 
    // }
    // console.log(user[0].local.userParks.fullName);
    // user[0].local.userParks.push({park});
  });
};

function deleteUser(req, res) {
  console.log(req.params._id);
  db.User.findOneAndRemove({_id: req.params._id}, function(err, deletedUser) {
    res.json(deletedUser);
  });
};

// PARK Routes

// GET homepage
function getParkIndex(req, res) {
  console.log("hello");
};

// GET ALL PARKS
function getParks(req, res) {
  console.log("Find a park");
    db.Park.find({}, function(err, parks) {
    res.json(parks);
  });
};

//SHOW
function getParksByState (req, res) {
  console.log("Get parks by state");
  db.Park.find({ states: req.params.state}, function(err, parks) {
    res.json(parks);
  });
};

//SHOW
function getByParkCode (req, res) {
  console.log(req);
  console.log("Get one park by parkCode");
  db.Park.find({ parkCode: req.params.parkCode}, function(err, park) {
    console.log(park);
    res.json(park);
  });
};

// PUT 
function updateUserByParkCode(req, res) {
  var parkToStore = req.body;
   db.User.find({_id: req.user._id}, function(err, res) {
    console.log(user[0].local.userParks);
    var userParks = user[0].local.userParks;
  });
}

//POST park to DB
function parkCreate(req, res) {
  console.log('params', req.body);
   db.Park.create(req.body, function(err, park) {
    if (err) { console.log('error', err); }
    {
    
  }
    res.json(park);
  });
};


//PUT
function editByParkCode (req, res) {
  db.Park.find({parkCode: req.params.parkCode}, function (err, foundPark) {
    if (err) {
      console.log("Update error: " + err);
    }
    foundPark.directionsUrl = req.body.directionsUrl;
    foundPark.save(function(err, park) {
      if (err) {
        return (err)
      } 
    res.send(park);
    });
  });
};



//DELETE


// GET
function populateApi(req, res) {
  db.Park.find({}, function(err, parks) {
    res.json(parks);
  });
};


// Show alerts for one park
function getAlerts(req, res) {
  var cmdAlerts = 'curl -X GET \
    https://developer.nps.gov/api/' + version + '/alerts?parkCode='+ req.params.parkCode +'\
    -H "authorization: "' + api_key +'\
    -H "cache-control: no-cache"';

    exec(cmdAlerts, function(err, stdout, stderr) {
        console.log("The err received is: ", err);
        console.log(stdout);
        console.log(stderr);
        res.send(stdout);
      });
}

// add to my parks



module.exports = {
  getAllUsers: getAllUsers,
  getUser: getUser,
  getParkIndex: getParkIndex,
  getParks: getParks,
  getParksByState: getParksByState,
  getByParkCode: getByParkCode,
  updateUserByParkCode: updateUserByParkCode,
  parkCreate: parkCreate,
  editByParkCode: editByParkCode,
  populateApi: populateApi,
  getAlerts: getAlerts,
  updateUserPark: updateUserPark,
  deleteUser: deleteUser
}