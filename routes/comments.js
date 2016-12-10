var express = require("express");
var router = express.Router({
    mergeParams: true
});

var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleWare = (require("../middleware"));

router.get("/new", middleWare.isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {
                campground: campground
            });
        }
    })
});
//Create Comment
router.post("/", middleWare.isLoggedIn, function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong.");
                    console.log(err);
                }
                else {
                    comment.author.id       = req.user._id;
                    comment.author.username = req.user.username;
                    
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment.");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//Edit Comment
router.get("/:comment_id/edit", middleWare.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        }else{
             res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//Update comment
router.put("/:comment_id", middleWare.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Comment destroy route
router.delete("/:comment_id", middleWare.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       }else{
           req.flash("success", "Comment deleted.");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
    
});
module.exports = router;