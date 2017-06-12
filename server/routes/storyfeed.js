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

router.post('/addStory', ensureAuth, function(req, res){
  Stories.addStory(req.body.id, req.body.usern, req.body.title, req.body.story, function(err, doc){
     if(err)
     	res.json(err);
     else
     	res.json(doc);
  });
});

router.get('/getStories', function(req, res){
     Stories.getall(function(err, doc){
     	if(err)
     		res.json(err);
     	else
     		res.json(doc);
     });
});

module.exports = router;