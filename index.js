// Node Modules
var http = require('http');
var url = require('url');
var fs = require('fs');

// Express Modules
var bodyParser = require('body-parser');
var session = require('express-session');

var db = require('./config/mongo');

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

// For doing sessions
app.use(session({
	name: 'filmwl-session',
	secret: 'keep-it-hush-hush-yeah',
	resave: false,
	saveUninitialized: false
}));

// Serve Static Files
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// Home Route
app.get('/', function(request, response) {
	require('./routes/home')(response, request, db());
});

// Test Page Route
app.get('/test/', function(request, response) {
	require('./routes/test')(response, db());
});

// Results Route
app.get('/results/', function(request, response) {
	require('./routes/results')(request, response, url, http);
});

// Film Added Route
app.post('/added/', function(request, response) {
	require('./routes/added')(request, response, db());
});

// Login Route
app.get('/login/', function(request, response) {
	require('./routes/login')(request, response);
});

// Login Result Route
app.post('/login-result/', function(request, response) {
	require('./routes/login-result')(request, response, db());
});

/*
// Register Route
app.get('/register/', function(request, response) {
	require('./routes/register')(request, response);
});

// Register Result Route
app.post('/register-result/', function(request, response) {
	require('./routes/register-result')(request, response, db());
});
*/

// User Watch List Route
app.get('/watch-list/', function(request, response) {
	require('./routes/watch-list')(request, response, db());
});

// Remove Film Route
app.post('/remove-film/', function(request, response) {
	require('./routes/remove-film')(request, response, db());
});


app.listen(process.env.PORT || port);