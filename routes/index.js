var express     = require("express"),
    router      = express.Router(),
    Asset       = require("../models/asset")

//Landing
router.get("/", function(req, res){
    Asset.find({}, function(err, assets){
        if(err){
            console.log(err);
        } else {
            
            res.render("landing", {assets:assets.slice(0,3)});
        }
    })
});

//about
router.get("/about", function(req, res){
    res.render("about");
});
//FAQ
router.get("/faq", function(req, res){
    res.render("faq");
});

module.exports = router;