var express       = require('express');
var router        = express.Router();
var path          = require('path');
var Users         = require('../models/user.js')
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash         = require('connect-flash');


function ensureAuth(req, res, next){
  if(req.isAuthenticated())
    return next();
  else
    res.redirect('/');

 }

 router.get('/getuser', ensureAuth, function(req, res){
      var user  = req.user;
      res.json(user);
 });

 router.get('/getAll/:id', ensureAuth, function(req, res){
      Users.getAll(req.params.id, function(err, doc){
        if(err)
          res.json(err);
        else
          res.json(doc);
      });
 });



router.post('/createVotes/:_id', ensureAuth, function(req, res){
      Users.addvoteUser(req.params._id, function(err, doc){
        if(err)
          res.json(err);
        else
          res.json(doc);
      });
});


router.get('/', ensureAuth, function(req, res, done){
  res.sendFile(path.join(__dirname + '/../../client/templates/stroryfeedpage.html'));
  console.log("FeedPage");
  var user  = req.user;
  console.log(user);
  req.flash('success_msg', 'frfgffdfdfdfsdfsd');
});
 
 
router.post('/addpoints/:id', ensureAuth, function(req, res){
       Users.addpoints(req.params.id, function(err, doc){
          if(err)
            res.json(err);
          else
            res.json(doc);
       });
});


router.get('/getalluser',ensureAuth, function(req,res){
     Users.getalluser(function(err, doc){
      if(err)
        res.json(err);
      else
        {
           if(doc === null)
               res.json(0);
            else
              res.json(doc);
           }
     });
   
});

router.get('/getUsername/:name', ensureAuth, function(req,res){
     Users.getUserByUsername(req.params.name, function(err, doc){
      if(err)
        res.json(err);
      else
        res.json(doc);
     });
   
});

/******************************** Registering new user ***************************************/
router.post('/register', function(req, res, next){
  var _username = req.body.username;
  var _password  = req.body.password;

  var newuser = new Users({
       username : _username,
       password : _password,
       points   : 0,
  });
  
Users.registerUser(newuser, function(err, doc){
  	  if(err)
  	  	throw err;
  	  console.log(doc);
  });
 });


passport.use(new LocalStrategy(
  function(username, password, done) {
   Users.getUserByUsername(username, function(err, user){
  
   	if(!user){
   		return done(null, false);
   	}

   	Users.comparePassword(password, user.password, function(err, isMatch){
   		
   		if(err) throw err;
   		if(isMatch)
   			return done(null, user);
   		 else 
   			return done(null, false);
   		
   	});
   });
  }));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Users.getUserById(id, function(err, user) {

    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/user/', failureRedirect:'/',failureFlash: true}),
  function(req, res) {
    res.redirect('/user/');
  });

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

/*************************************************************************************************/
module.exports = router;
