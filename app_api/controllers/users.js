var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// GET list of all users
module.exports.usersListAll = function (req, res) {
 console.log('Fetching all users');
 User
	.find({}, function(err, results) {
	 if (err) {
		console.log(err);
		sendJSONresponse(res, 404, err);
		return;
	 }
	 console.log(results);
	 sendJSONresponse(res, 200, results);
	 });
};