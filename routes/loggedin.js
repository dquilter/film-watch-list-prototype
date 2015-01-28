module.exports = function(request, response, url, http, db) {
	console.log(request.body);

	db.open(function(error){
		console.log('We are connected!');
		
		response.render('loggedin', function(error, html) {
			response.send(html);
		});
	});

};