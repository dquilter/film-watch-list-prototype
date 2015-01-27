var http = require('http');
var url = require('url');
var fs = require('fs');

var htmlEnt = require('html-entities').AllHtmlEntities;
var bodyParser = require('body-parser');

var host = '127.0.0.1';
var port = 8000;

var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

// Handlebars
app.engine('html', exphbs({ 
	defaultLayout: 'layout',
	extname: '.html'
}));
app.set('view engine', 'html');   

// For reading POST data
app.use(bodyParser.urlencoded({ extended: false }));

var server = http.createServer(function(request, response) {
	
	// Needed?
	
});

var routes = {
	search: 'search',
	results: 'results',
	film: 'film',
	user: 'user'
}


function render(response, html) {
	var entities = new htmlEnt();
	var toRender = entities.decode(html);
	response.send(toRender);
}

// Serve Static Files
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// Home Route
app.get('/', function(request, response) {
	response.render('home', function(error, html) {
		render(response, html);
	});
});

app.get('/test/', function(request, response) {
	response.render('test', function(error, html) {
		render(response, html);
	});
});

// Results Route
app.get('/results/', function(request, response) {
	var query = url.parse(request.url, true).query;
	var film = query.film.replace(/\s/g, '+');
	var requestData = '';

	var omdbOptions = {
		host: 'www.omdbapi.com',
		path: '/?t=' + film,
		method: 'GET'
	}
	
	var data = {};
	
	var omdbRequest = http.request(omdbOptions, function(response) {
		
		response.on('error', function(error) {
			console.log('Error: ' + error.message);
		});

		response.on('data', function(chunk) {
			requestData += chunk.toString('utf8');
		});

		response.on('end', function() {
			var dataArray = JSON.parse(requestData);
			
			// Check if film exists
			if(dataArray.Response === "False") {
				console.log('There ain\'t no film');
				omdbReqFail();
			} else {
				data.id = dataArray.imdbID;
				data.title = dataArray.Title;
				data.year = dataArray.Year;
				data.poster = dataArray.Poster;
				data.director = dataArray.Director;

				var parsedString = data.title + ' (' + data.year + ') - ' + data.director;
				console.log(parsedString);

				console.log('End OMDB');
				omdbReqSuccess();
			}
		});

	});
	
	omdbRequest.end();
	
	function omdbReqSuccess() {
	
		console.log(data);

		response.render('results', {
			helpers: {
				name: data.director,
				id: data.id,
				title: data.title,
				year: data.year,
				poster: data.poster,
				director: data.director
			}	
		}, function(error, html) {
			var entities = new htmlEnt();
			var toRender = entities.decode(html);
			response.send(toRender);
//			CAN THIS USE THE RENDER FUNCTION?
//			console.log(this);
//			render(response, html, helpers);
		});

	}
	
	function omdbReqFail() {
		response.render('no-results', function(error, html) {
			var entities = new htmlEnt();
			var toRender = entities.decode(html);
			response.send(toRender);
//			CAN THIS USE THE RENDER FUNCTION?
//			console.log(this);
//			render(response, html, helpers);
		});	
	}

});

// Film Added Route
app.post('/added/', function(request, response) {

	console.log(request.body);

		var userID = 2;
		var username = 'David';
//		var filmID = 12345;
//		var filmTitle = 'Not Another Fake Movie';
		var filmID = request.body.id;
		var filmTitle = request.body.title;

	
	response.render('added', {
		helpers: {
			title: filmTitle,
		}	
	}, function(error, html) {
		var entities = new htmlEnt();
		var toRender = entities.decode(html);
		response.send(toRender);
//			CAN THIS USE THE RENDER FUNCTION?
//			render(response, html, helpers);
	});	
	
	var mongo = require('mongodb');

	var host = '127.0.0.1';
	var port = mongo.Connection.DEFAULT_PORT;
	var db = new mongo.Db('film-wish-list-test', new mongo.Server(host, port, {}));
	db.open(function(error){
		console.log('We are connected!');

		
		//Insert User
		db.collection('users', function(error, collection) {
			console.log('We have the user collection');

			// Insert Users (if they don't exist)
			collection.find({ 'id': userID }, function(error, cursor) {
				cursor.toArray(function(error, user) {
					console.log(user);
					// Add film (if it doesn't exist)
					if(user.length > 0) {
						console.log('Film already in wishlist!')
					} else {
						collection.insert({
							id: userID,
							name: username,
						}, function() {
							console.log('David is in');
						});
					}
				});
			});
			
		});

		// Insert film
		db.collection('films', function(error, collection) {
			console.log('We have the film collection');

			// Check for film in Watchlist
			collection.find({ 'filmId': filmID }, function(error, cursor) {
				cursor.toArray(function(error, film) {
					console.log(film);
					// Add film (if it doesn't exist)
					if(film.length > 0) {
						console.log('Film already in wishlist!')
					} else {
						addFilm();
					}
				});
			});
			
			function addFilm() {
				collection.insert({
					userId: userID,
					filmId: filmID,
					title: filmTitle
				}, function() {
					console.log('Film is in');
				});
			};

		});
	});

});


app.listen(port, host);