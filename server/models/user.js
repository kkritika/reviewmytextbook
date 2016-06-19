// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
	name:String,
 	username: String,
  	password: String,
  	email: String
});
var options = ({missingPasswordError: "Wrong password"});
User.plugin(passportLocalMongoose,options);


module.exports = mongoose.model('user', User);