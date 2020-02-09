var mongoose = require('mongoose');
var Game = mongoose.model('Game');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

// POST a new game
module.exports.gamesCreate = function (req, res) {
	console.log(req.body);
	Game
	.create({
		board: req.body.gameBoard,
		winner: req.body.win,
		gameName: req.body.name,
		player1: req.body.p1,
		player2: req.body.p2,
		start: req.body.gameStart,
		end: req.body.gameEnd
	},
	function(err, blog) {
	  if(err) {
		console.log(err);
	   	sendJSONresponse(res, 400, err);
	  }
	  else {
		console.log(blog);
		sendJSONresponse(res, 201, blog);
	  }
	});
};

// GET list of all games
module.exports.gamesListAll = function (req, res) {
 console.log('Fetching all games');
 Game
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

// GET a game by ID
module.exports.gamesReadOne = function (req, res) {
 console.log('Finding game details', req.params);
 if (req.params && req.params.gameID) {
  Game
	.findById(req.params.gameID)
	.exec(function(err, game) {
	  if (!game) {
		sendJSONresponse(res, 404, 
		 {"message": "gameID not found"});
		 return;
	  }
	  else if (err) {
		console.log(err);
		sendJSONresponse(res, 404, err);
		return;
	  }
	  console.log(game);
	  sendJSONresponse(res, 200, game);	
	});
 }
 else {
	console.log('No gameID specified');
	sendJSONresponse(res, 404,
	{"message": "No gameID in request"});
 }
};

// PUT: Update the game that has this ID 
module.exports.gamesUpdateBoard = function (req, res) {
 if(!req.params.gameID) {
	sendJSONresponse(res, 404,
	{"message": "Not found, gameID is required"});
	return;
 }

var column = "board." + req.body[0].col;

Game
 	.updateOne
 	(
 		{ "_id": req.params.gameID },
 		{ $set: { [column] : req.body } }
 	)
 	.exec(function(err, game) {
	  if (!game) {
		sendJSONresponse(res, 404,
		{"message": "gameID not found"});
		return;
	  }
	  else if (err) {
		sendJSONresponse(res, 400, err);
		return;
	  }
	});
 };

 // DELETE the game that has this ID
module.exports.gamesDeleteOne = function (req, res) {
 var gameID = req.params.gameID;
 if (gameID) {
  Game
	.findByIdAndRemove(gameID)
	.exec(function(err, game) {
	 if (err) {
		console.log(err);
		sendJSONresponse(res, 404, err);
		return;
	 }
	 console.log("Game ID " + gameID + " deleted");
	 sendJSONresponse(res, 204, null);
	});
 }
 else {
	sendJSONresponse(res, 404, 
	{"message": "No gameID"});
 }
};











