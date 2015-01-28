// Node Modules
var http = require('http');
var url = require('url');
var fs = require('fs');

// Express Modules
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var host = '127.0.0.1';
var port = 8000;

var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

// Handlebars
app.engine('html', exphbs({ 
	defaultLayout: 'layout',
	extname: '.html',
}));
app.set('view engine', 'html');   

// For reading POST data
app.use(bodyParser.urlencoded({ extended: false }));

// For reading cookies
app.use(cookieParser());

// Serve Static Files
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// Home Route
app.get('/', function(request, response) {
	require('./routes/home')(response);
});

// Test Page Route
app.get('/test/', function(request, response) {
	require('./routes/test')(response);
});

// Results Route
app.get('/results/', function(request, response) {
	require('./routes/results')(request, response, url, http);
});

// Film Added Route
app.post('/added/', function(request, response) {
	require('./routes/added')(request, response);
});

// Login Route
app.get('/login/', function(request, response, cookieParser) {
	require('./routes/login')(request, response);
});

// Film Added Route
app.post('/loggedin/', function(request, response) {
	require('./routes/loggedin')(request, response);
});

app.listen(port, host);