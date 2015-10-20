var express      = require('express'),
path         = require('path'),
flash        = require('connect-flash'),
favicon      = require('serve-favicon'),
cookieParser = require('cookie-parser'),
bodyParser   = require('body-parser'),
session      = require('express-session'),
routes       = require('./routes/index'),
review       = require('./routes/review'),
AWS          = require('aws-sdk'),
fs           = require('fs'),
app          = express();

//Set up the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// App configuration ///////////////////////////////////////////////////
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json()); // needed for post requests, still figuring out what it does
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //Sets the public folder to be available available to the front end


//Connect to database
AWS.config.update({
  accessKeyId: 'AKIAIJEG2OGEQALNK2WA', 
  secretAccessKey: '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',
  region: 'us-west-2'
});

// Make the db accessible to our router
app.use(function(req, res, next){
  req.db = new AWS.DynamoDB.DocumentClient();
  next();
})

//Set index.js to be the main router
app.use('/', routes);
app.use('/review', review);

// error handlers /////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        })
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

console.log('Current Environment: ' + app.get('env'));

app.listen(80); 

module.exports = app;