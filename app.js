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
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {camps: campgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;

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

app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id, function(err, foundCamp) {
		if (err) {
			console.log(err);
		} else {
			res.render("show", {camp: foundCamp});
		}
	});
});

app.listen(3000, function() {
	console.log("YelpCamp Server started on port 3000.");
});
