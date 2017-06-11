var express          = require('express');
var path             = require('path');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
var exphbs           = require('express-handlebars');
var expressValidator = require('express-validator');
var flash            = require('connect-flash');
var session          = require('express-session');
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var mongo            = require('mongodb');
var mongoose         = require('mongoose');
var app              = express();
var router           = express.Router();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//static files folder
app.use(express.static(path.join(__dirname,'/../client')) );

//DATABASE connectivity
mongoose.connect('mongodb://localhost/StoryShare');
var db = mongoose.connection;

//different routes 
var routes = require('./routes/index');
//var feeds  = require('./routes/storyfeed');

app.get('/main', function(req, res){
   res.sendFile(path.join(__dirname,'/../client' ,'index.html'));
});


//Routes
app.use('/user',routes);
//app.use('/feeds', feeds);


// secret-session storage
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
})); 


// Passport init
app.use(passport.initialize());
app.use(passport.session());


/* Server runing on port */
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
	console.log("Server is runing man !!!");
}); 

