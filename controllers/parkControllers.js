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
  console.log('req is: ' + req)
  var userId = req.user._id;
  console.log(req.body._id);
  console.log('this users ID is: ' + userId);
  db.User.find({_id: req.user._id}, function(err, user, park) {
    console.log('finding userParks')
    // var userParks = user[0].local.userParks;
    console.log(user[0]);
    console.log('the users parks should be empty: ' + user[0].local.userParks);
    // user[0].local.userParks.push({park});

    

    // user[0].local._id = park.id;
    // user[0].local.userParks.location = req.body.location;
    // user[0].local.userParks.website_url = req.body.website_url;
    // user[0].local.userParks.hike_complete = req.body.hike_complete;
    // user[0].local.userParks.save();
    // res.json(user[0].local.userParks);

    // console.log(user[0].local.userParks);
  });
  // User.save(function(err) {
  //   if(!err) {
  //     res.send(userParks);
  //   } else {
  //     res.send(err);
  //   }
  // });
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
  console.log(req.params);
  console.log("Get one park by parkCode");
  db.Park.find({ parkCode: req.params.parkCode}, function(err, park) {
    console.log(park);
    res.json(park);
  });
};

//POST park to user MyParks page

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



// app.get('/COparks', function(req, res) {

// 	console.log("Making get request at Index");
//     exec(cmdParks, function(err, stdout, stderr) {
//       console.log(err);
//       console.log(stdout);
//       var parsed = JSON.parse(stdout);
//       console.log(stderr);
//       res.send(parsed);
//     });
// });

// $.get('/api/parks', function parkNames (req, res) {
//   db.Park.find({}, function(err, parks){
//     res.json(parks);
//   });
// });

// // Sort parks by state
// $.get('/api/parks/:state', function(req, res) {
//   console.log(req.params.state);
//   db.Park.find({ states: req.params.state}, function(err, parks) {
//     res.json(parks);
//   });
// });


// // Takes in parkCode and returns alerts for park


// app.get('/api/myparks', function myParks(req, res) {
//   res.json('Current users parks')
// })

// // Posts park to db under users.userParks 
// app.post('/api/myparks', function myParkCreate (req, res, next) {
//   console.log(req.body);
//   res.end();
//   // db.findUser({email: req.user.}, function (err, user) {
    
//   //   if (err) return handleError(err);
//   //   console.log(currentUser);
//   // });
// });

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
  editByParkCode: editByParkCode,
  populateApi: populateApi,
  getAlerts: getAlerts,
  updateUserPark: updateUserPark
}