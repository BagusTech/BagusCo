var express = require('express'),
	router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Bagusco: Bringing Your Ideas to Life',
		description: 'Bagusco, founded in 2015, is dedicated to creating a quality product that you can be proud of.'
	});
});

router.get('/contact-us', (req, res, next) => {
	res.render('contact-us', {
		title: 'Bagusco: Bringing Your Ideas to Life',
		description: 'Bagusco, founded in 2015, is dedicated to creating a quality product that you can be proud of.'
	});
});

router.post('/contact-us', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const userQuestion = req.body.userQuestion;
	const emailSubject = `New request from ${name}`;
	const emailBody = `
		<dl>
			<dt>Name</dt>
			<dd>${name}</dd>
			<dt>Email</dt>
			<dd>${email}</dd>
			<dt>Question</dt>
			<dd>${userQuestion}</dd>
		</dl>
	`;

	// send email

	res.send('success');
});

module.exports = router;