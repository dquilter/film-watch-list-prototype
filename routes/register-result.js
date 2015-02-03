module.exports = function(request, response, db) {
	console.log(request.body);
	var username = request.body.username;
	var password = request.body.password;
	var userCount;
	var success;

	db.when('available', function (err, db) {

		db.collection('users', function(error, collection) {
			
		});
		
		//Insert User
		db.collection('users', function(error, collection) {
			console.log('We have the user collection');

			// Insert Users (if they don't exist)
			collection.find({ 'name': username }, function(error, cursor) {
				cursor.toArray(function(error, user) {
					console.log(user);
					// Add user (if it doesn't exist)
					if(user.length > 0) {
						console.log('User already in wishlist!');
						response.render('register-exists');
					} else {
						collection.insert({
							id: 999,
							name: username,
						}, function() {
							console.log('User has been added!');
							response.render('register-success');
						});
					}
				});
			});

		});
	});
};