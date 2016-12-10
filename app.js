var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStratagy = require("passport-local"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    methodOverride = require("method-override")
    
//requring routes
var commentRoutes = require("./routes/comments"),
    campgroundtRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    
//mongoose.connect("mongodb://localhost/yelp_camp_v11");
mongoose.connect("mongodb://nick:nick16@ds127968.mlab.com:27968/nicksdev");

app.use(bodyParser.urlencoded({
    extended: true
}));

// set the view engine to ejs
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public"));
app.use(flash());

//seedDB(); // Seed the DB

// Passport config
app.use(require("express-session")({
    secret: "I love my wife!!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
passport.use(new LocalStratagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundtRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server Has Started!");
});