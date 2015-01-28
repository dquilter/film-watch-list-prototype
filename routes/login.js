module.exports = function(request, response) {
	console.log(request.cookies);
	response.render('login', function(error, html) {
		response.send(html);
	});
};