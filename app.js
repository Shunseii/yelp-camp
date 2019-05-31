var mongoose 	= require("mongoose"),
	bodyParser 	= require("body-parser"),
	express 	= require("express"),
	app 		= express();

mongoose.set("useNewUrlParser", "true");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*
Campground.create(
	{
		name: "Salmon Creek", 
		image: "https://farm8.staticflickr.com/7152/6386347187_653d1825af.jpg"
	}, function(err, campground) {
		if (err) {
			console.log("Error Occured:\n " + err);
		} else {
			console.log("Added entry:\n " + campground);
		}
	});
*/

var campgrounds = [];

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds", {camps: campgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;

	Campground.create(
		{
			name: name,
			image: image
		}, function(err, newCamp) {
			if (err) {
				console.log(err);
			} else {
				res.redirect("/campgrounds");
			}
		}
	);
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(3000, function() {
	console.log("YelpCamp Server started on port 3000.");
});
