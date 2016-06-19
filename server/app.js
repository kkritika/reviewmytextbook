// dependencies
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var methodOverride = require('method-override');
var path = require('path');
var passport = require('passport');
// var nodemailer = require("nodemailer");
var localStrategy = require('passport-local').Strategy;

// mongoose
mongoose.connect('mongodb://localhost/mean-auth');

// user schema/model
var User = require('./models/user.js');
var Book = require('./models/book.js');
var Comment = require('./models/comment.js');

// create instance of express
var app = express();

// require routes
var apiRoutes = require('./routes/api.js');
// var commentRoutes = require('./routes/comment.js');


// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true' }));

// log every request to the console
// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use(express.static('/user/'), apiRoutes);
// app.use('/comment/', commentRoutes);
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));

});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

module.exports = app;
