var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

router.get('/callback', 
	passport.authenticate('facebook', {
		successRedirect : '/profile',
		failureRedirect : '/'
	})
);

module.exports = router;