module.exports = function(response, request, db) {
	var session = request.session;

	if(session.id) {
		response.render('home', {
			user: session.name,
		});
	}
};