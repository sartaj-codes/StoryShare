var express       = require('express');
var router        = express.Router();
var path          = require('path');
var Stories       = require('../models/userStories.js')
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash         = require('connect-flash');

function ensureAuth(req, res, next){
 	if(req.isAuthenticated())
 		return next();
 	else
 		res.redirect('/');

 }

router.post('/addStory/:id', ensureAuth, function(req, res){
  console.log(req.params.id);
  Stories.addStory(req.params.id, req.body.usern, req.body.title, req.body.story, function(err, doc){
     if(err)
     	res.json(err);
     else
     	res.redirect('/user/');
  });
});


router.get('/getStories/:id', ensureAuth,  function(req, res){
      Stories.getAll(req.params.id, function(err, doc){
        if(err)
          res.json(err);
        else
          res.json(doc);
      });
 });

router.post('/voteUser', ensureAuth, function(req, res){
	Stories.voteUser(req.body.storyId, req.body.userId, function(err, doc){
     if(err)
       res.json(err);
     else
      res.redirect(req.get('/'));
  });
});




module.exports = router;