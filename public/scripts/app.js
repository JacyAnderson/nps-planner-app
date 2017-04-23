// CLIENT-SIDE JS
var usStates = [
    { name: 'Alabama', abbreviation: 'AL'},
    { name: 'Alaska', abbreviation: 'AK'},
    { name: 'American Samoa', abbreviation: 'AS'},
    { name: 'Arizona', abbreviation: 'AZ'},
    { name: 'Arkansas', abbreviation: 'AR'},
    { name: 'California', abbreviation: 'CA'},
    { name: 'Colorado', abbreviation: 'CO'},
    { name: 'Connecticut', abbreviation: 'CT'},
    { name: 'Delaware', abbreviation: 'DE'},
    { name: 'District of Colombia', abbreviation: 'DC'},
    { name: 'Florida', abbreviation: 'FL'},
    { name: 'Georgia', abbreviation: 'GA'},
    { name: 'Guam', abbreviation: 'GU'},
    { name: 'Hawaii', abbreviation: 'HI'},
    { name: 'Idaho', abbreviation: 'ID'},
    { name: 'Illinois', abbreviation: 'IL'},
    { name: 'Indiana', abbreviation: 'IN'},
    { name: 'Iowa', abbreviation: 'IA'},
    { name: 'Kansas', abbreviation: 'KS'},
    { name: 'Kentucky', abbreviation: 'KY'},
    { name: 'Louisiana', abbreviation: 'LA'},
    { name: 'Maine', abbreviation: 'ME'},
    { name: 'Marshall Islands', abbreviation: 'MH'},
    { name: 'Maryland', abbreviation: 'MD'},
    { name: 'Massachusetts', abbreviation: 'MA'},
    { name: 'Michigan', abbreviation: 'MI'},
    { name: 'Minnesota', abbreviation: 'MN'},
    { name: 'Mississippi', abbreviation: 'MS'},
    { name: 'Missouri', abbreviation: 'MO'},
    { name: 'Montana', abbreviation: 'MT'},
    { name: 'Nebraska', abbreviation: 'NE'},
    { name: 'Nevada', abbreviation: 'NV'},
    { name: 'New Hampshire', abbreviation: 'NH'},
    { name: 'New Jersey', abbreviation: 'NJ'},
    { name: 'New Mexico', abbreviation: 'NM'},
    { name: 'New York', abbreviation: 'NY'},
    { name: 'North Carolina', abbreviation: 'NC'},
    { name: 'North Dakota', abbreviation: 'ND'},
    { name: 'Northern Mariana Islands', abbreviation: 'MP'},
    { name: 'Ohio', abbreviation: 'OH'},
    { name: 'Oklahoma', abbreviation: 'OK'},
    { name: 'Oregon', abbreviation: 'OR'},
    { name: 'Palau', abbreviation: 'PW'},
    { name: 'Pennsylvania', abbreviation: 'PA'},
    { name: 'Puerto Rico', abbreviation: 'PR'},
    { name: 'Rhode Island', abbreviation: 'RI'},
    { name: 'South Carolina', abbreviation: 'SC'},
    { name: 'South Dakota', abbreviation: 'SD'},
    { name: 'Tennessee', abbreviation: 'TN'},
    { name: 'Texas', abbreviation: 'TX'},
    { name: 'Utah', abbreviation: 'UT'},
    { name: 'Vermont', abbreviation: 'VT'},
    { name: 'Virgin Islands', abbreviation: 'VI'},
    { name: 'Virginia', abbreviation: 'VA'},
    { name: 'Washington', abbreviation: 'WA'},
    { name: 'West Virginia', abbreviation: 'WV'},
    { name: 'Wisconsin', abbreviation: 'WI'},
    { name: 'Wyoming', abbreviation: 'WY' }
];



$(document).ready(function() {
  console.log("Hello world!");
  $.get('/api/parks', function(parks) { 
    parks.forEach(function(park){
      $('.select-box').append("<option>" + park.fullName + "</option>");
    });
  });
//   getParkNames();
  $('.select-box').change(function() {
    searchParks();
  });
//   	});
//   	getState();
  
 
});

// // Searches through parks array to match selected park
function searchParks() {
	$.get('/api/parks', function(parks) {
		parks.forEach(function(park) {
			if ($('.select-box option:selected').val() === park.fullName) {
              console.log(park);
              console.log(park.states);
              renderPark(park);
			}
		});
	});
}


function getAlerts() {
  $.get('/alerts/:parkCode', function(req, res) {
    console.log("about to make request");
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
  });
}


// // When .state-dropdown is selected, take .innerHtml and loop through var usStates to match usStates.name
// function getState() {
// 	$('.state-dropdown').on('click', function(){
//       console.log("Dropdown clicked!");
// 	});




// 	// if($('.state-menu option:selected')) {
// 	// 	console.log("State selected!");
// 	// };
// 	// $.get('/api/parks/' + state, function(parks) {
//  //      parks.forEach(function(park) {
//  //      	console.log(park);
//  //      })
// 	// })
// };





// // function renderAlerts(alerts) {
	    	
// // }


function renderPark(park) {
	console.log('rendering park:', park);


	var parkHtml =
	"        <!-- one park -->" +
	"        <div class='row park' data-park-id='" + park._id + "'>" +
	"          <div class='col-md-12'>" +
	"            <div class='panel panel-default'>" +
	"              <div class='panel-body'>" +
	"              <!-- begin park internal row -->" +
	"                <div class='row'>" +
	"                  <div class='col-md-8 col-xs-12'>" +
	"                    <ul class='list-group'>" +
	"                      <li class='list-group-item'>" +
	"                        <h2 class='inline-header'>"+ park.fullName +"</h2>" +
	"                        <h4 class='inline-header'>States: " + park.states + "</h4>" +
	"                    </ul>" +
	"                  </div>" +
	"                  <div class='col-md-4 col-xs-12 thumbnail park-pic'>" +
	"                     <img src='" + "http://placehold.it/500x500'" +  " alt='park image'>" +
	"                  </div>" +
	"                  <div class='col-md-8 col-xs-12'>" +
	"                    <ul class='list-group'>" +
	"                      <li class='list-group-item'>" +
	"                        <h5 class='inline-header'>Description:</h5>" +
	"                        <p>"+ park.description +"</p>" +
	"                    </ul>" +
	"                  </div>" +
	"                </div>" +
	"                <div class='" + park.parkCode+ "-alerts'>" +
               // ALERTS!

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-primary add-park' data-parkcode='" + park.parkCode + "'>Save to My Parks</button>" +

  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one park -->";

  $('#parks').prepend(parkHtml);
  function buildAlertsHtml(park, parkCode) {
		console.log(park.parkCode);
		$.get('/alerts/' + park.parkCode) 
		.done(function(data) {
			var parsed = JSON.parse(data);

      $('.' + park.parkCode + '-alerts').append("<div class='"+ park.parkCode +"-alert alert alert-danger'><strong>Alerts</strong></div>");
			for(var i = 0; i < parsed.data.length; i++) {
        
        // Store alert as variable
				let newAlert = {
					category: parsed.data[i].category,
					title: parsed.data[i].title,
					description: parsed.data[i].description,
					url: parsed.data[i].url
				}
				console.log(newAlert.title);

        // Append alert to page
				$('.' + park.parkCode + '-alert').append('<hr>');
				$('.' + park.parkCode + '-alert').append('<h5>' + newAlert.title + '<h5>');
				$('.' + park.parkCode + '-alert').append('<p>' + newAlert.description + '<p>');
				// $('.alert-danger').append('hr');
       
			}
		});    
	}
	buildAlertsHtml(park, park.parkCode);
   $('.add-park').on('click', function(event) {
    console.log('button clicked');
    var newMyPark = $(this).data("parkcode");
    console.log(newMyPark);
    console.log(this);
  });
}


