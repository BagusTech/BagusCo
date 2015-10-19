$(window).on('load', function(){
	init();
})

function init(){
	if($('#Location').length > 0){
		var options = {
				//types: ['geocode'] //document.getElementById('Type').value
			},
			input = document.getElementById('Location'),
			autocomplete = new google.maps.places.Autocomplete(input, options);
	}
}