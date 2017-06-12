var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  
    id:{
    	  type: String,
    	  required : true
    },
     username:{
    	  type: String,
    	  required : true
    },
     title:{
    	  type: String,
    	  required : true
    },
    story:{
    	type: String,
    	required : true
    }

});
var user = module.exports = mongoose.model('Users_stories', userSchema);

module.exports.addStory = function(_id, _username, _title, _story, callback)
{
	new user({
		id       : _id,
		username : _username,
		title    : _title,
		story    : _story,
	}).save(callback);
	
}

module.exports.getall = function(callback){
	user.find({}, callback);
}
