module.exports = function() {

	// Setup
	var mongo = require('mongodb');

	var host = '127.0.0.1';
	var port = mongo.Connection.DEFAULT_PORT;

//	var db = new mongo.Db('film-wish-list-test', new mongo.Server(host, port, {}));
//	return db;
	
	var MongoClient = mongo.MongoClient
	var Server = mongo.Server;

	var mongoURL = process.env.mongoURL;
	
	var connectOnce = require('connect-once');
	
	var connection = new connectOnce({
		retries: 60,
		reconnectWait: 1000
	}, MongoClient.connect, mongoURL);	
	
	return connection;
};