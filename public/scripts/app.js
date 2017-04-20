// CLIENT-SIDE JS

$(document).ready(function() {
  console.log("Hello world!");
  getParkNames();
});


function getParkNames() {
	$.get('/api/parks', function(parks) { 
		parks.forEach(function(park){
			$('.select-box').append("<option>" + park.fullName + "</option>").attr('park-id', park.id);  
		});
	});
}

