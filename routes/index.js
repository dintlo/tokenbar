var express     = require("express"),
    router      = express.Router();

//Landing
router.get("/", function(req, res){
    res.render("landing");
});

//FAQ
router.get("/about", function(req, res){
    res.render("about");
});

module.exports = router;