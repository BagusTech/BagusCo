$(document).ready(function(){
	showSubmittedResults();

	$('#SubmitSimpleReview').on('click', submitSimpleReview);
});

var updateMode = function(e){
	e.preventDefault();

	var row = $(this).parent().parent(),
		updateButton = row.find('.update-button'),
		deleteButton = row.find('.delete-button'),
		country = row.find('.country'),
		thoughts = row.find('.thoughts');

	console.log(updateButton);

	row.toggleClass('update-mode');

	deleteButton.unbind();
	updateButton.unbind();

	updateButton.toggleClass('btn-info');
	updateButton.toggleClass('btn-success');

	$('.update').click(updateReview);

	if (row.hasClass('update-mode')){
		deleteButton.click(updateMode);
		updateButton.click(updateReview);

		var currentCountry = country.text(),
			currentThoughts = thoughts.text();


		country.html('<input class="form-control" id="UpdateCountry" value="'+ currentCountry +'"/>');
		
		thoughts.html('<textarea class="form-control" id="UpdateThoughts" />');
		$('#UpdateThoughts').val(currentThoughts);

		deleteButton.text('Cancel')
	} else {
		deleteButton.click(deleteReview);
		updateButton.click(updateMode);

		var currentCountry = $('#UpdateCountry').val(),
			currentThoughts = $('#UpdateThoughts').val();

		console.log(currentCountry);

		country.text(currentCountry);
		thoughts.text(currentThoughts);
	}
}

function showSubmittedResults(){
	var tableContent = '';

	$.getJSON('/review/submitted-reviews', function(data){
		$.each(data, function(){
			tableContent += '<tr class="test">';
			tableContent += '<td class="country">' + this.Country + '</td>';
			tableContent += '<td class="thoughts">' + this.Thoughts + '</td>';
			tableContent += '<td><button class="btn btn-info update-button" value="' + this.Id + '">Update</button></td>';
			tableContent += '<td><button class="btn btn-danger delete-button" value="' + this.Id + '">Delete</button></td>';
			tableContent += '</tr>';
		});

		$('#SubmittedResults').html(tableContent);

	}).done(function(){
		$('.delete-button').click(deleteReview);
		$('.update-button').click(updateMode);
		$('.cancel-update-button').click(updateMode);
	});
};

function submitSimpleReview(e){
	e.preventDefault();

	// Create a guid
	function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
	}
	
	var guid = guid();

	// Super basic validation - increase errorCount if any fields are blank
	var errorCount = 0;
	$('#SimpleReview input').each(function(){
		if($(this).val() === ''){
			errorCount++;
		}
	});
	$('#SimpleReview textarea').each(function(){
		if($(this).val() === ''){
			errorCount++;
		}
	});

	if(errorCount === 0){
		
		// Create the Object that will be added into the table
		var simpleReview = {
			'Id': guid,
			'Country': $('#Country').val(),
			'Thoughts': $('#Thoughts').val()
		}

		$.ajax({
			type: 'POST',
			data: simpleReview,
			url: '/review/submit-simple-review',
			dataType: 'JSON'
		}).done(function(response){
			console.log('done!');

			// Check if the response message matches our success message in defined review.js
			if(response.msg === ''){
				// Clear out the input fields
				$('#Country').val('');
				$('#Thoughts').val('');

				// Update the table
				showSubmittedResults();
			} else {

				// If something goes wrong, alert the error message
				alert('Error: ' + response.msg);
			}
		}).fail(function(err){
			console.log(err);
		})
	} else {
		// If errorCount is more than 0, error out
		alert('Please fill in all fields');
		return false;
	}
}

function deleteReview(e){
	e.preventDefault();

	var confirmation = confirm('Are you sure you would like to delete this review?')

	if (confirmation === true){
		$.ajax({
			type: 'DELETE',
			url: '/review/delete-review/' + $(this).val() 
		}).done(function(response){
			if(response.msg === ''){
				showSubmittedResults();
			} else {
				console.log('Error: ' + response.msg);
			}
		})
	} else {
		// User did not confirm
		return false
	}
}

function updateReview(e){
	e.preventDefault();

	//create data object
	var updatedReview = {
		'Id': $(this).val(),
		'Country': $('#UpdateCountry').val(),
		'Thoughts': $('#UpdateThoughts').val()
	}

	$.ajax({
		type: 'PUT',
		data: updatedReview,
		url: '/review/update-review',
		dataType: 'JSON'
	}).done(function(response){
		if (response.msg === ''){
			showSubmittedResults();
		} else {
			console.log('Error: ' + response.msg);
		}
	})
}