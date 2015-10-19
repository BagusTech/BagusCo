var express = require('express'),
	router = express.Router();

// Pages
router.get('/submitted', function(req, res, next){
	res.render('submitted', {
		title: 'Submitted Reviews - Bagus',
		description: 'Wire a review to be used in Bagus\'s latest project. These reviews will be used to help users all over the world get a better sense of what places they may want to go to based on what people with similar preferences think.'
	});
});

// REST calls
router.get('/submitted-reviews', function(req, res, next){
	var db = req.db,
		params = {
			TableName: 'ReviewForm',
		}

	db.scan(params, function(err, data){
		res.json(data.Items);
	})
});

router.post('/submit-simple-review', function(req, res){
	var db = req.db,
		params = {
			TableName: 'ReviewForm',
			Item: {
				'Id': req.body.Id,
				'Country': req.body.Country,
				'Thoughts': req.body.Thoughts
			}
		}

	console.log(req.body);

	db.put(params, function(err, data) {
		res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
	});
});

router.delete('/delete-review/:id', function(req, res){
	var db = req.db,
		params = {
			TableName: 'ReviewForm',
			Key: {
				'Id': req.params.id
			}
		}

	db.delete(params, function(err, data){
		res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
	})
});

router.put('/update-review', function(req, res){
	var db = req.db,
		params = {
			TableName: 'ReviewForm',
			Key: {
				'Id': req.body.Id
			},

			UpdateExpression: 'set Country = :c, Thoughts = :t',
			ExpressionAttributeValues: {
				':c': req.body.Country,
				':t': req.body.Thoughts
			},
		}

	db.update(params, function(err, data){
		res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
	})
});

module.exports = router;