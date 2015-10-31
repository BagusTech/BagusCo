var express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    routes       = require('./routes/index'),
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


//Set index.js to be the main router
app.use('/', routes);

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

console.log('Stating Bagus Co Website');
console.log('Current Environment: ' + app.get('env'));

app.listen(80); 

module.exports = app;