const mongoose = require('mongoose');

var userprofileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	username: {
		type: String
	},
	weight: {
		type: Number,
	},
	
	weightunits: {
		type:String,
	},
	heightunits: {
		type:String,
	},
	height: {
		type:  Number,
	},
	gender: {
		type: String
	},
	age: {
		type: Number,
	},
	activityLevel:{
		type:String,
	},
	goal:{
		type:String,
	},
	approach:{
		type:String,
	},
	email: {
		type: String,
		default: 'abc@xyz.com',
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	date: {
		type: Date,
		default: Date.now
	}
});

var userprofileModel = mongoose.model('userprofile', userprofileSchema);
module.exports = userprofileModel;
