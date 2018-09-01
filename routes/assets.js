var express     = require("express"),
    router      = express.Router(),
    Asset       = require("../models/asset"),
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
        token: req.body.token, tokenCap: req.body.tokenCap, tokenPrice: req.body.tokenPrice
    };
    Asset.create(newAsset, function(err, newlyAsset){
        if(err){
            console.log(err);
        } else {
            res.redirect("/assets");
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