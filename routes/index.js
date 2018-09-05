var express     = require("express"),
    router      = express.Router();

//Landing
router.get("/", function(req, res){
    res.render("landing");
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