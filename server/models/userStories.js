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
    },
    story_flag:
        {
            
            flag :{ type : Boolean },
            text :{ type : String  },
        },
});
var user = module.exports = mongoose.model('Users_stories', userSchema);

module.exports.addStory = function(_id, _username, _title, _story, callback)
{
	new user({
		id       : _id,
		username : _username,
		title    : _title,
		story    : _story,
		story_flag : {
			flag : true,
			text : "Vote"
		}
	}).save(callback);
	
}

module.exports.getAll = function(_id, callback){
	//console.log(_id);
	user.find({id : _id}, callback);
}

module.exports.getAll2 = function(_id, callback){
	//console.log(_id);
	user.find({}, callback);
}

module.exports.voteUser = function(storyId, userId,  callback)
{
	 
    user.update(  {$and : [{id : userId}, {_id : storyId }]} ,
                    { $set : 
                      {
                        story_flag :
                           {
                              flag : false,
                               text:"voted" 
                           },
                     }
                 } , function(err, doc){
                    if(err)
                        return callback(err, false);
                    else
                        return callback(doc, true);
                 });
}