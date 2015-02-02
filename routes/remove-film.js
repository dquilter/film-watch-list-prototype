module.exports = function(request, response, db) {
	console.log(request.body);
	
	var requestValues = request.body;
	var userId = parseInt(requestValues.user, 10);
	
	db.when('available', function (err, db) {
		console.log('We are connected!');
		
		//Insert User
		db.collection('films', function(error, collection) {
			console.log('We have the films collection');

			collection.remove({ 'userId': userId, filmId: requestValues.film }, function(error) {
				response.render('remove-film');	
			});
		});
	});
};