module.exports = function(request, response, db) {
	console.log(request.body);

	var session = request.session;
	
	var userID = session.userId;
	var username = session.name;
	var filmID = request.body.id;
	var filmTitle = request.body.title;

	db.when('available', function (err, db) {
		console.log('We are connected!');

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
		
		response.render('added', {
			title: filmTitle,
		});	
		
		
	});
};