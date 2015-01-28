module.exports = function(request, response, url, http) {
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
			if(dataArray.Error !== undefined) {
				console.log(dataArray.Error);
				omdbReqFail(dataArray.Error);
			} else if(dataArray.Response === "False") {
				console.log('There ain\'t no film');
				omdbReqNone();
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