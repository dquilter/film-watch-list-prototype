module.exports = function(request, response, db) {
	console.log(request.body);
	var username = request.body.username;
	var password = request.body.password;
	var success;
	
	var session = request.session;
	console.log(session);

	db.when('available', function (err, db) {
		console.log('We are connected!');
		
		db.collection('users', function(error, collection) {
			var userData = collection.find({ name: username }, function(error, cursor) {
				cursor.toArray(function(error, user) {
					console.log(user);
					// Check for user
					if (user.length !== 1) {
						// Issue with no of users
						success = false;
					} else {
						// Check password
						success = password === user[0]['password'] ? true : false;
					}
				
					if(success === true) {
						session.userId = user[0]['id'], 
						session.name = user[0]['name']
						response.render('login-success');
					} else {
						response.render('login-fail');
					}
				});

			});
			
		});
		
	});

};