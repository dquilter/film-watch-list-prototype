module.exports = function() {

	// Setup
	var mongo = require('mongodb');

	var host = '127.0.0.1';
	var port = mongo.Connection.DEFAULT_PORT;

//	var db = new mongo.Db('db-name', new mongo.Server(host, port, {}));
//	return db;
	
	var MongoClient = mongo.MongoClient
	var Server = mongo.Server;

	var mongoURL = '';
	
	var connectOnce = require('connect-once');
	
	var connection = new connectOnce({
		retries: 60,
		reconnectWait: 1000
	}, MongoClient.connect, mongoURL);	
	
	return connection;
	
	
	
	

/*
	//Local
	var mongoClient = new MongoClient(new Server(host, port));
	return mongoClient;
*/

	// Remote
//	var mongoURL = '';
//	

//	MongoClient.connect(mongoURL, function(err, db) {
//		console.log('connecting');
//
//			console.log('connected');
//			return db;
//
//		// Connect test
////		db.collection('users', function(error, collection) {
////			console.log('We have the film collection');
////
////			// Insert Users (if they don't exist)
////			collection.find({ name: 'user' }, function(error, cursor) {
////				cursor.toArray(function(error, films) {
////
////					console.log(films);
////					db.close();
////				});
////			});
////		});
//	});

	

	
//	connection.when('available', function (err, db) {
//		console.log(db.raw);
//		return db; 
//	});
	
//	mongoClient.open(function(err, mongoClient) {
//		
//		var db = mongoClient.db('db-name');
//		
////		db.collection('user', function(err, collection) {
////			collection.find({ name: 'user' }, function(err) {
////				cursor.toArray(function(error, user) {
////					console.log(user);
////				});
////			});
////		});
//		
//		console.log('DB')
//		console.log(err);
//		return db;
//	});



//		mongoClient.open(function(error, mongo){
//			console.log('We are connected!');
//			var db = mongo.db('db-name');
//			return db;
//		});



//	mongoClient.open(function(err, mongoClient) {
//		var db = mongoClient.db('film-wish-list-test');
//		return db;
//	});
};