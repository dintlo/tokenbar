var express     = require("express"),
    router      = express.Router(),
    User        = require("../models/user"),
    passport    = require("passport"),
    Asset       = require("../models/asset"),
    Wallet      = require("../models/wallet"),
    Transaction = require("../models/transaction"),
    middlewareObj = require("../middleware/middleware"),
    tokenizationService = require("../services/tokenization")


//Show register form
router.get("/register", function(req, res){
    res.render("users/register");
})

//Register a new user
router.post("/register", function(req, res){
    
    var newNativeWallet = {
        token: "NLT",
        balance: 100,
        publicKey:  "12121212121212121212",
        privateKey: "21212121212121212121"
    }
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        country: req.body.country
    });
    newUser.wallets.push(newNativeWallet);

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/users/register");
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
    res.render("users/login");
});

//authenticate a user
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/users",
    failureRedirect: "/users/login"

}) ,function(req, res){})

//logout
router.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/");
});

//See your own profile page whilst logged in
router.get("/", function(req, res){
    res.render("users/show")
});

// // See a users profile page
// router.get("/:id", function(req, res){
    
// })

//See your tokenized assets
router.get("/myassets", function(req, res){
    tokenizationService.getAssetsById(req.user._id, function(assets){
        console.log(assets);
        var assetsArray = [];
        assetsArray.push(assets)
        res.render("users/myassets", {assets:assets})
    })
});

//See your asset portfolio
router.get("/portfolio", function(req, res){
    var portfolio;
    req.user.wallets.array.forEach(wallet => {
        tokenizationService.getAssetsByPublicAddress(wallet.publicKey, function(assets){
            portfolio.push(assets);
        })
    });
    
    res.render("users/portfolio", {assets:portfolio})
});


module.exports = router;