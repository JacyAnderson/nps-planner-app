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
  getParkNames();
  $('.select-box').change(function() {
  	// var selected = $('.select-box option:selected').val();
    // console.log($('.select-box option:selected').val());
    searchParks();
  	});
  	getState();
});

// Get all parks from database, and using a loop, populate form with the fullName for each park
function getParkNames() {
	$.get('/api/parks', function(parks) { 
		parks.forEach(function(park){
		  $('.select-box').append("<option>" + park.fullName + "</option>");
		});
	});
};

// Searches through parks array to match selected park
function searchParks() {
	$.get('/api/parks', function(parks) {
		parks.forEach(function(park) {
			if ($('.select-box option:selected').val() === park.fullName) {
              console.log(park);
              console.log(park.states);
              renderPark(park);


              // $('main').append('<div class=".container-fluid ' + park.parkCode +'-row" row>');
              // $('.' + park.parkCode + '-row').append('<div class="'+ park.parkCode+'-col col-md-6 col-lg-6"></div>');
              // $('.' + park.parkCode + '-col').append('<h2>' + park.fullName + '</h2>');
              // $('.' + park.parkCode + '-col').append('<p>' + park.description + '</p>');

              // $('main.container').attr('class', 'collapse');
			}
		});
	});
}


// When .state-dropdown is selected, take .innerHtml and loop through var usStates to match usStates.name
function getState() {
	$('.state-dropdown').on('click', function(){
      console.log("Dropdown clicked!");
	});




	// if($('.state-menu option:selected')) {
	// 	console.log("State selected!");
	// };
	// $.get('/api/parks/' + state, function(parks) {
 //      parks.forEach(function(park) {
 //      	console.log(park);
 //      })
	// })
};



function buildAlertsHtml(park, parkCode) {

}

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
buildAlertsHtml(park, park.parkCode) +
  "                <!-- end of park internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-primary add-park'>Save to My Parks</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one park -->";

  $('#parks').prepend(parkHtml);
 }