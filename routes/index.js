var express     = require("express"),
    router      = express.Router(),
    User = require("../models/user"),
    passport = require("passport")

//Landing
router.get("/", function(req, res){
    res.render("landing");
});

//FAQ
router.get("/about", function(req, res){
    res.render("about");
});

//Show register form
router.get("/register", function(req, res){
    res.render("register");
})

//Register a new user
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/register");
        } else {
            //log user in
            passport.authenticate("local")(req, res, function(){
                res.redirect("/assets");
            })
        }
    });
})

//show login page
router.get("/login", function(req, res){
    res.render("login");
});

//authenticate a user
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/",
    failureRedirect: "/login"

}) ,function(req, res){})

//logout
router.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;