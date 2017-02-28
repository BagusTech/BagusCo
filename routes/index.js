const express = require('express'),
	  smtp = require('../config/smtp'),
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
	const userQuestion = req.body.userQuestion.replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
	const mailOptions = {
		from: '"Bagusco" <joe@bagusco.com>', // sender address (formatted to be named)
		to: ['"Joe" <joe@bagusco.com>', '"Alan" <alan@bagusco.com>', '"Peter" <peter@bagusco.com>'], // list of receivers (can be array)
		subject: `New request from ${name}`, // Subject line
		html: `
				<dl>
					<dt>Name</dt>
					<dd>${name}</dd>
					<dt>Email</dt>
					<dd>${email}</dd>
					<dt>Question</dt>
					<dd>${userQuestion}</dd>
				</dl>
			`
	};

	smtp.sendMail(mailOptions, function(err, info) {
		if (err) {
			res.status(500).send(err);
			console.error(err);
		} else {
			res.status(200).send('success');
			console.log('Message sent: ' + info.response);
		}
	});
});

module.exports = router;