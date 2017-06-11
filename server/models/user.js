var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  
    username:{
    	  type: String,
    	  index: true,
    	  required : true
    },
    password:{
    	type: String,
    	required : true
    }

});
var user = module.exports = mongoose.model('Users', userSchema);

module.exports.registerUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt){
	  bcrypt.hash(newUser.password, salt, function(err, hash){
	  	  newUser.password = hash;
	  	  newUser.save(callback);
      });	
	});
}

module.exports.getUserByUsername = function(username , callback){
    var query = {username : username};
	user.findOne(query, callback);

}

module.exports.getUserById = function(id, callback){
	user.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}