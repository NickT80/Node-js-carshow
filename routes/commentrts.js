var express = require("express");
var router = express.Router({
    mergeParams: true
});

var Carshow = require("../models/carshow");
var Comment = require("../models/comment");
var middleWare = (require("../middleware"));

router.get("/new", middleWare.isLoggedIn, function(req, res) {
    // find Carshow by id
    Carshow.findById(req.params.id, function(err, Carshow) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {
                Carshow: Carshow
            });
        }
    })
});
//Create Comment
router.post("/", middleWare.isLoggedIn, function(req, res) {
    //lookup Carshow using ID
    Carshow.findById(req.params.id, function(err, Carshow) {
        if (err) {
            console.log(err);
            res.redirect("/Carshows");
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
                    Carshow.comments.push(comment);
                    Carshow.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment.");
                    res.redirect('/Carshows/' + Carshow._id);
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
             res.render("comments/edit", {Carshow_id: req.params.id, comment: foundComment});
        }
    });
});

//Update comment
router.put("/:comment_id", middleWare.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/Carshows/" + req.params.id);
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
           res.redirect("/Carshows/" + req.params.id);
       }
   });
    
});
module.exports = router;