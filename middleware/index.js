var middlewareObj = {};
var Carshow = require("../models/carshow");
var Comment = require("../models/comment");

middlewareObj.checkCarshowOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
         Carshow.findById(req.params.id, function(err, foundCarshow){
         if (err) {
             req.flash("error", "Carshow not found.");
            res.redirect("back");
        } else {
            if(foundCarshow.author.id.equals(req.user._id)) {
                next();    
            }else{
                req.flash("error", "You don't have permission to do that.");
                res.redirect("back");
            }
        }
    });
    }else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id, function(err, foundComment){
         if (err) {
            res.redirect("back");
        } else {
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            }else{
                req.flash("error", "You don't have permission to do that.");
                res.redirect("back");
            }
        }
    });
    }else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}

module.exports = middlewareObj;