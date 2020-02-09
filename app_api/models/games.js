var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({

	board:
	[[{
		col:
		{
			type: Number,
			required: true
		},
		row:
		{
			type: Number,
			required: true
		},
		checked:
		{
			type: Boolean,
			required: true
		},
		
		color: String
	}]],

	winner: String,
	gameName: {
		type: String,
		required: true
	},
	player1:
	{
		nickname: String,
		userEmail:
		{
			type: String,
			required: true
		},
		color:
		{
			type: String,
			required: true
		},
	},
	player2:
	{
		nickname: String,
		userEmail:
		{
			type: String,
			required: true
		},
		color:
		{
			type: String,
			required: true
		},
	},
	start:
	{
		type: Date,
		required: true
	},
	end:
	{
		type: Date,
		required: true
	}
});

mongoose.model('Game', gameSchema);