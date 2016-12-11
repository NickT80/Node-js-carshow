var express = require("express");
var router = express.Router();
var Carshow = require("../models/carshow");
var middleWare = (require("../middleware"));


router.get("/", function(req, res) {
    // Get all Carshows from DB
    Carshow.find({}, function(err, allCarshows) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("Carshows/index", {
                Carshows: allCarshows,
                currentUser: req.user
            });
        }
    });
});

//CREATE - add new Carshow to DB
router.post("/", middleWare.isLoggedIn, function(req, res) {
    // get data from form and add to Carshows array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCarshow = {
            name: name,
            image: image,
            description: desc,
            author : author
        };
        
        // Create a new Carshow and save to DB
    Carshow.create(newCarshow, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(newlyCreated);
            //redirect back to Carshows page
            res.redirect("/Carshows");
        }
    });
});

//NEW - show form to create new Carshow
router.get("/new", middleWare.isLoggedIn, function(req, res) {
    res.render("Carshows/new");
});

// SHOW - shows more info about one Carshow
router.get("/:id", function(req, res) {
    //find the Carshow with provided ID
    Carshow.findById(req.params.id).populate("comments").exec(function(err, foundCarshow) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(foundCarshow)
                //render show template with that Carshow
            res.render("Carshows/show", {
                Carshow: foundCarshow
            });
        }
    });
});

//Edit Carshow
router.get("/:id/edit", middleWare.checkCarshowOwnership, function(req, res) {
    //is user logged in
    if(req.isAuthenticated()){
         Carshow.findById(req.params.id, function(err, foundCarshow){
         if (err) {
            res.redirect("/Carshows");
        } else {
            if(foundCarshow.author.id.equals(req.user._id)) {
            res.render("Carshows/edit", {Carshow: foundCarshow});    
            }else{
                res.send("You do not have permission to do that")
            }   
        }
    });
    }else{
        res.send("You need to be logged in.")
    }
    //does user own camp
     
});

router.put("/:id", middleWare.checkCarshowOwnership,function(req, res){
    Carshow.findByIdAndUpdate(req.params.id, req.body.Carshow, function(err, updatedCarshow){
         if (err) {
            res.redirect("/Carshows");
        }
        else {
            res.redirect("/Carshows/" + req.params.id);
        }
    });
});

//Delete Route
router.delete("/:id/",middleWare.checkCarshowOwnership, function(req, res){
    Carshow.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/Carshows");
        }else{
             res.redirect("/Carshows");
        }
    });
});


module.exports = router;