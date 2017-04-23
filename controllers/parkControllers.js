var db = require('../models');

// require commandline
var exec = require('child_process').exec;
// API Key located in .env
var api_key = process.env.NPS_KEY;
var version = "v0";




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

module.exports = {
  getParkIndex: getParkIndex,
  getParks: getParks,
  getParksByState: getParksByState,
  getByParkCode: getByParkCode,
  editByParkCode: editByParkCode,
  populateApi: populateApi,
  getAlerts: getAlerts
}