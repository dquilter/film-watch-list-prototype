module.exports = function(request, response) {
	console.log(request.session);
	var session = request.session;
	
	if(session.userId) {
		// Send to home
		response.redirect('/');
	} else {
		response.render('register');
	}
	
};