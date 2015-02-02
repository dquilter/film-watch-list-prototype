module.exports = function(request, response, db) {
	var session = request.session;
	var renderData = {};
	
	console.log(session);
	
	db.when('available', function (err, db) {
		console.log('We are connected!');
		
		// Get films saved by user
		db.collection('films', function(error, collection) {
			console.log('We have the film collection');
			collection.find({ 'userId': session.userId }, function(error, cursor) {
				cursor.toArray(function(error, films) {
					render(films);
				});
			});
		});
	});
	
	function render(films) {
		console.log(films);
		if(!session.userId) {
			// Send to login
			response.redirect('/login');
		} else {
			response.render('watch-list', {
				films: films,
			});
		}
	}
	
};