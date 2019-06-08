var Campground = require('../models/campground');
var Comment = require('../models/comment');

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} 
	return res.redirect("/login");
}

function checkOwnership(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, campground) {
			if (err) {
				console.log(err);
				res.redirect("back");
			} else {
				if (campground.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}	
}

function checkCommentOwnership(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, comment) {
			if (err) {
				console.log(err);
				res.redirect("back");
			} else {
				if (comment.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

module.exports = {
	isLoggedIn, 
	checkOwnership,
	checkCommentOwnership
}
