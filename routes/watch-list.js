module.exports = function(request, response, db) {
	var session = request.session;
	var renderData = {};
	
	console.log(session);
	console.log('Listing...');
	
	db.open(function(error){
		console.log('We are connected!');
		
		//Insert User
		db.collection('films', function(error, collection) {
			console.log('We have the film collection');

			// Insert Users (if they don't exist)
			collection.find({ 'userId': session.userId }, function(error, cursor) {
				cursor.toArray(function(error, films) {
					
					render(films);
				});
			});
		});
	});
	
	function render(films) {
		console.log(films);
		
		var parsedFilms = JSON.stringify(films);
		
		if(!session.userId) {
			// Send to login
			response.redirect('/login');
		} else {
			response.render('watch-list', {
				films: films,
				helpers: {

				}
			});
		}
	}
	
};