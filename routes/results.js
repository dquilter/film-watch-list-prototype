module.exports = function(request, response, url, http) {
	var query = url.parse(request.url, true).query;
	var film = query.film.replace(/\s/g, '+');
	var requestData = '';
	var renderData = {};

	var session = request.session;
	console.log(session);
	
	// Disable inputs if user not logged in
	var loggedIn = session.userId === undefined ? "disabled" : "";
	
	var omdbOptions = {
		host: 'www.omdbapi.com',
		path: '/?t=' + film,
		method: 'GET'
	}
	
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
			if(dataArray.Error !== undefined) {
				console.log(dataArray.Error);
				omdbReqFail(dataArray.Error);
			} else if(dataArray.Response === "False") {
				console.log('There ain\'t no film');
				omdbReqNone();
			} else {
				renderData.id = dataArray.imdbID;
				renderData.title = dataArray.Title;
				renderData.year = dataArray.Year;
				renderData.poster = dataArray.Poster;
				renderData.director = dataArray.Director;

				var parsedString = renderData.title + ' (' + renderData.year + ') - ' + renderData.director;
				console.log(parsedString);

				console.log('End OMDB');
				omdbReqSuccess();
			}
		});

	});
	
	omdbRequest.end();
	
	function omdbReqSuccess() {
	
		console.log(renderData);

		response.render('results', {
			helpers: {
				name: renderData.director,
				id: renderData.id,
				title: renderData.title,
				year: renderData.year,
				poster: renderData.poster,
				director: renderData.director,
				disabled: loggedIn
			}	
		}, function(error, html) {
			response.send(html);
		});

	}
	
	function omdbReqNone() {
		response.render('no-results', function(error, html) {
			response.send(html);
		});	
	}

	function omdbReqFail(omdbError) {
		response.render('results-error', {
			helpers: {
				error: omdbError
			}	
		}, function(error, html) {
			response.send(html);
		});	
	}

};