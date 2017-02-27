/* global jQuery */

void function initScripts($){
	'use strict';

	function toggleText($btn) {
		const currentText = $btn.text();
		const newText = currentText === 'View More' ? 'View Less' : 'View More';
		console.log(currentText);

		// shouldn't be altering the text on this button
		if(currentText !== 'View More' && currentText !== 'View Less') {return;}

		$btn.text(newText);
	}

	$(() => {
		$('[data-toggle="collapse"]').on('click', (e) => {
			//e.stopPropagation();
			e.preventDefault();

			toggleText($(e.target));
		})
	})
}(jQuery);