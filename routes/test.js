module.exports = function(response, db) {
	
	db.open(function(error){
		console.log('We are connected!');
		
		response.render('test', function(error, html) {
			response.send(html);
		});
	});

};