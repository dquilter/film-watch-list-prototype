module.exports = function(response) {
	response.render('test', function(error, html) {
		response.send(html);
	});
};