var express = require('express'),
	router = express.Router();

router.get('/', function(req, res, next){
	res.render('index', {
		title: 'Bagus: It\'s the best!',
		description: 'Bagus Tech, founded in 2015, is the world\'s formost innovator in travel technologies and services.'
	});
});

router.get('/review', function(req, res, next){
	res.render('review', {
		title: 'Write a Review - Bagus',
		description: 'Write a review to be used in Bagus\'s latest project. These reviews will be used to help users all over the world get a better sense of what places they may want to go to based on what people with similar preferences think.'
	});
});

router.get('/profile', function(req, res, next){
	res.render('profile', {
		title: 'Welcome [get persons name]',
		description: 'This is [perosn]\'s profile and they like bagus which is something we like too'
	})
})

module.exports = router;