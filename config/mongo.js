module.exports = function() {

	var mongo = require('mongodb');

	var host = '127.0.0.1';
	var port = mongo.Connection.DEFAULT_PORT;
	var db = new mongo.Db('film-wish-list-test', new mongo.Server(host, port, {}));

	return db;
	
};