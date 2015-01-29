module.exports = function(request, response, db) {
	console.log(request.body);

	var session = request.session;
	
//	var userID = 2;
//	var username = 'David';
	var userID = session.userId;
	var username = session.name;
//	var filmID = 12345;
//	var filmTitle = 'Not Another Fake Movie';
	var filmID = request.body.id;
	var filmTitle = request.body.title;

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
						console.log('User already in wishlist!')
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
		
		response.render('added', {
			helpers: {
				title: filmTitle,
			}	
		}, function(error, html) {
			response.send(html);
		});	
		
		
	});
};