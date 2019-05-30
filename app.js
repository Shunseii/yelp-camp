var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	var campgrounds = [
		{name: "Salmon Creek", image: "https://farm8.staticflickr.com/7152/6386347187_653d1825af.jpg"},
		{name: "Granite Hill", image: "https://farm3.staticflickr.com/2015/1811919920_544bf964e1.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6029/5923336732_b7f5ab0075.jpg"}
	]

	res.render("campgrounds", {camps: campgrounds});
});

app.listen(3000, function() {
	console.log("YelpCamp Server started on port 3000.");
});
