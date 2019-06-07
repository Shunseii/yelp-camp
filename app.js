var mongoose 				= require("mongoose"),
	bodyParser 				= require("body-parser"),
	express 				= require("express"),
	passport 				= require('passport'),
	LocalStrategy 			= require('passport-local'),
	passportLocalMongoose 	= require('passport-local-mongoose'),
	app 					= express(),
	Campground 				= require("./models/campground"),
	Comment 				= require('./models/comment'),
	User 					= require('./models/user'),
	seedDB					= require('./seeds');

var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');

mongoose.set("useNewUrlParser", "true");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
	secret: "Secret Keyword",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, function() {
	console.log("YelpCamp Server started on port 3000.");
});
