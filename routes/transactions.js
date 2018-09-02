var express     = require("express"),
    router      = express.Router(),
    Transaction = require("../models/transaction"),
    Asset       = require("../models/asset"),
    middlewareObj = require("../middleware/middleware");

//:Get
router.get("/",middlewareObj.isLoggedIn, function(req, res){
    
    Transaction.find({}, function(err, assets){
        if(err){
            console.log(err);
        } else {
            res.render("assets/index", {transactions:transactions});
        }
    })
})

//:Post
router.post("/",middlewareObj.isLoggedIn, function(req, res){
    var newTransaction = {buyerKey: req.user.wallets[0].publicKey, sellerKey: req.body.as, token: req.body.token, amount:req.body.amount};
    Transaction.create(newTransaction, function(err, newlyTransaction){
        if(err){
            console.log(err);
        } else {
            res.redirect("assets/index");
        }
    })
});

//:New
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    res.render("transactions/new");
})

//:Show
router.get("/:id", middlewareObj.isLoggedIn, function(req, res){
    Asset.findById(req.params.id).populate("transactions","wallet").exec(function(err, asset){
        if(err){
            console.log(err);
        } else {
            res.render("assets/show", {asset: asset})
        }
    })
})


router.get("/new/:id",middlewareObj.isLoggedIn, function(req, res){
    Asset.findById(req.params.id, function(err, asset){
        if(err){
            console.log(err);
        } else {
            res.render("transactions/new", {asset: asset})
        }
    })
})
module.exports = router;