// logger
var fs = require('fs');
var date = (new Date()).toISOString().substring(0,10);
var accessLogfile = fs.createWriteStream('access_logger_' + date + '.log', {
	flags : 'a'
});
var errorLogfile = fs.createWriteStream('error_logger_' + date + '.log', {
	flags : 'a'
});
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

var routes = require('./routes/index');
var users = require('./routes/user');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon());
app.use(logger({
	stream : accessLogfile
}));

app.use(bodyParser());
app.use(cookieParser());
app.use(methodOverride());
app.use('/', routes);
app.use('/', user);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes);
app.get('/users', user);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
