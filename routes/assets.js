var express     = require("express"),
    router      = express.Router(),
    Asset       = require("../models/asset"),
    User        = require("../models/user"),
    middlewareObj = require("../middleware/middleware"),
    tokenizationService = require("../services/tokenization")


//Asset:Get
router.get("/", function(req, res){
    
    Asset.find({}, function(err, assets){
        if(err){
            console.log(err);
        } else {
            console.log(assets)
            res.render("assets/index", {assets:assets});
        }
    })
})

//Asset:Post
router.post("/",middlewareObj.isLoggedIn, function(req, res){
    var newAsset = tokenizationService.createAsset(req)
    
    Asset.create(newAsset, function(err, newlyAsset){
        if(err){
            console.log(err);
        } else {
            
            var updatedUser = req.user.assets.push(newlyAsset);
            User.findByIdAndUpdate(req.user._id,updatedUser, function(err, newUser){
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