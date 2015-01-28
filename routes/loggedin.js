module.exports = function(request, response, url, http) {
	console.log(request.body);

	var mongo = require('mongodb');

	var host = '127.0.0.1';
	var port = mongo.Connection.DEFAULT_PORT;
	var db = new mongo.Db('film-wish-list-test', new mongo.Server(host, port, {}));
	db.open(function(error){
		console.log('We are connected!');
		
		response.render('loggedin', function(error, html) {
			response.send(html);
		});
	});

};