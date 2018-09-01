var express     = require("express"),
    router      = express.Router(),
    Asset       = require("../models/asset"),
    User        = require("../models/user"),
    middlewareObj = require("../middleware/middleware");

//Asset:Get
router.get("/", function(req, res){
    
    Asset.find({}, function(err, assets){
        if(err){
            console.log(err);
        } else {
            res.render("assets/index", {assets:assets});
        }
    })
})

//Asset:Post
router.post("/",middlewareObj.isLoggedIn, function(req, res){
    var newAsset = {
        name: req.body.name, type: req.body.type, location: req.body.location, 
        description:req.body.description, image: req.body.image,
        token: req.body.token, tokenCap: req.body.tokenCap, tokenPrice: req.body.tokenPrice,
        wallets:[
            {
                token: req.body.token,
                balance: req.body.tokenCap,
                publicKey: "12121212120",
                privateKey: "2121212120",
            },
            {
                token: "NLT",
                balance: 0,
                publicKey: "12121212121",
                privateKey: "212121212121",
            }]
        };

    Asset.create(newAsset, function(err, newlyAsset){
        if(err){
            console.log(err);
        } else {
            
            var updatedUser = req.user.assets.push(newlyAsset);
            User.findByIdAndUpdate(req.user.id, updatedUser, function(err, newUser){
                if(err){
                    console.log(err);
                } else {
                    res.redirect("/assets");
                }
            })
        }
    })
});

//Asset:New
router.get("/new",middlewareObj.isLoggedIn, function(req, res){
    res.render("assets/new");
})

//Asset:Show
router.get("/:id", function(req, res){
    Asset.findById(req.params.id).populate("transactions","wallet").exec(function(err, asset){
        if(err){
            console.log(err);
        } else {
            res.render("assets/show", {asset: asset})
        }
    })
})

module.exports = router;