// GET /
function home(req, res) {  
  res.render('index');
}

// Renders parks page
function parks(req, res) {
  res.render('parks');
}

// Get /myParks
function myParks(req, res) {
  res.render('myParks');
}

module.exports = {
  home: home,
  parks: parks,
  myParks: myParks,
}
