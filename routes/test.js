module.exports = function(response) {
	response.render('test', function(error, html) {
		response.format({
			'text/html': function() {
				console.log('Bosh!');
				response.send(html);
			}
		});
	});
};