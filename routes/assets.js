var express     = require("express"),
    router      = express.Router(),
    Asset       = require("../models/asset")

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
router.post("/", function(req, res){
    var newAsset = {name: req.body.name, type: req.body.type, location: req.body.location, description:req.body.description, image: req.body.image};
    Asset.create(newAsset, function(err, newlyAsset){
        if(err){
            console.log(err);
        } else {
            res.redirect("assets/index");
        }
    })
});

//Asset:New
router.get("/new", function(req, res){
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