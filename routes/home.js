module.exports = function(response) {
	response.render('home', function(error, html) {
		response.send(html);
	});
};