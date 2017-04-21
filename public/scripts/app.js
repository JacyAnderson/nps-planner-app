// CLIENT-SIDE JS

$(document).ready(function() {
  console.log("Hello world!");
  getParkNames();
  $('.select-box').change(function() {
  	// var selected = $('.select-box option:selected').val();
    // console.log($('.select-box option:selected').val());
    searchParks();
  	});
});


function getParkNames() {
	$.get('/api/parks', function(parks) { 
		parks.forEach(function(park){
		  $('.select-box').append("<option>" + park.fullName + "</option>");
		});
	});
};

function searchParks() {
	$.get('/api/parks', function(parks) {
		parks.forEach(function(park) {
			if ($('.select-box option:selected').val() === park.fullName) {
              console.log(park);
			}
		});
	});
}