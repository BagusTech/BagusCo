/* global jQuery */

void function initScripts($){
	'use strict';

	function toggleText($btn) {
		const currentText = $btn.text();
		const newText = currentText === 'View More' ? 'View Less' : 'View More';

		// shouldn't be altering the text on this button
		if(currentText !== 'View More' && currentText !== 'View Less') {return;}

		$btn.text(newText);
	}

	function hideStatus($status) {
		setTimeout(() => {
			$status.slideUp(270);
		}, 3000);
	}

	function failedEmail($button, $status, html) {
		$status
			.addClass('alert-danger')
			.removeClass('alert-success')
			.html(html)
			.slideDown(270);

		$button.prop('disabled', false);

		hideStatus($status);
	}

	function successEmail($question, $button, $status, html) {
		$question.val('');

		$status
			.removeClass('alert-danger')
			.addClass('alert-success')
			.html(html)
			.slideDown(270);

		$button.prop('disabled', false);

		hideStatus($status);
	}

	function sendEmail($name, $email, $question, $button, $status) {
		const mailOptions = {
			name: $name.val(),
			email:$email.val(),
			userQuestion: $question.val(),
		}
		const failedText = `
			<p>
				Something went wrong, please try again.
			</p>
			<p>
				If this continues to persist, we deeply appologize, 
				but you can email us directly at 
				<a href="mailto:joe@bagusco.com">joe@bagusco.com</a>
			</p>
		`

		$button.prop('disabled', true);

		$.ajax({
			method: 'POST',
			data: JSON.stringify(mailOptions),
			contentType: 'application/json',
			url: '/contact-us',
			success: (response, msg) => {
				if (msg !== 'success') {
					failedEmail($button, $status, failedText);
					return;
				}

				successEmail($question, $button, $status, '<p class="lead">Thanks for the message!</p><p>We\'ll get back to you within 1 business day.</p>');
			},
			error: (err) => {
				failedEmail($button, $status, failedText);
			}
		})
	}

	function isValidEmail(email) {
		const re = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/

		return re.test(email);
	}

	$(() => {
		//alert('working')
		$('[data-toggle="collapse"]').on('click', (e) => {
			e.preventDefault();

			toggleText($(e.target));
		});

		const $name = $('#EmailName');
		const $email = $('#EmailEmail');
		const $question = $('#EmailQuestion');
		const $button = $('#EmailSubmit');
		const $status = $('#EmailStatus');

		$email.on('input', (e) => {
			e.stopPropagation();

			if(isValidEmail($email.val())){

				$email.closest('.form-group').removeClass('has-error');
				return;
			}

			$email.closest('.form-group').addClass('has-error');
		})

		$button.on('click', (e) => {
			e.stopPropagation();
			e.preventDefault();

			if($name.val() && $email.val() && isValidEmail($email.val()) && $question.val()) {
				sendEmail($name, $email, $question, $button, $status);
				return;
			}

			failedEmail($button, $status, '<p>All the fields need to be filled out and valid before you can send, thanks!</p>')
		});
	})
}(jQuery);