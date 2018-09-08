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
            res.render("assets/index", {assets:assets});
        }
    })
})

//Asset:Post
router.post("/",middlewareObj.isLoggedIn, function(req, res){
    var newAsset = tokenizationService.createAsset(req)
    res.redirect("/assets");
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


//Asset:edit
router.get("/:id/edit",middlewareObj.isAssetCreator, function(req, res){
    Asset.findById(req.params.id, function(err,foundAsset){
        if(err) {
            console.log(err)
            res.redirect("/assets")
        } else{
            res.render("assets/edit", {asset : foundAsset});
        }
    })
    
})


//Asset:Put
router.put("/:id", middlewareObj.isAssetCreator, function(req, res){
    Asset.findByIdAndUpdate(req.params.id, req.body.asset, function(err, updatedAsset){
        if(err){
            console.log(err);
            res.redirect("/assets")
        } else {
            res.redirect("/assets/" + req.params.id);
        }
    })
    
})

module.exports = router;