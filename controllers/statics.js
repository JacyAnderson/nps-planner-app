// GET /
function home(req, res) {  
  res.render('index');
}

function parks(req, res) {
  res.render('parks');
}

module.exports = {
  home: home,
  parks: parks,
}
