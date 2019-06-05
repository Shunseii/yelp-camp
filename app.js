var mongoose 	= require("mongoose"),
	bodyParser 	= require("body-parser"),
	express 	= require("express"),
	app 		= express(),
	Campground 	= require("./models/campgrounds"),
	Comment 	= require('./models/comment'),
	seedDB		= require('./seeds');

seedDB();

mongoose.set("useNewUrlParser", "true");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ROUTES 

app.get("/", function(req, res) {
	res.render("landing");
});

// Index Route
app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {camps: campgrounds});
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

// New Route
app.get("/campgrounds/new", function(req, res) {
	res.render("campgrounds/new");
});

// Show Route
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {camp: foundCamp});
		}
	});
});

// ============== Comments Routes ==========

app.get("/campgrounds/:id/comments/new", function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

app.listen(3000, function() {
	console.log("YelpCamp Server started on port 3000.");
});
