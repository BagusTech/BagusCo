var express = require('express'),
	router = express.Router();

router.get('/', function(req, res, next){
	res.render('index', {
		title: 'Bagus: It\'s the best!',
		description: 'Bagus Tech, founded in 2015, is the world\'s formost innovator in travel technologies and services.'
	});
});

module.exports = router;