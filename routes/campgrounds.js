var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// Index Route
router.get("/", function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {camps: campgrounds});
		}
	});
});

// Create route
router.post("/", isLoggedIn, function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {id: req.user._id, username: req.user.username};
	var newCampground = {name: name, image: image, description: desc, author};

	Campground.create(newCampground, function(err, newCamp) {
			if (err) {
				console.log(err);
			} else {
				res.redirect("/campgrounds");
			}
		}
	);
});

// New Route
router.get("/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

// Show Route
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {camp: foundCamp});
		}
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} 
	return res.redirect("/login");
}

module.exports = router;
