var Asset       = require("../models/asset"),
    Wallet      = require("../models/wallet"),
    Transaction = require("../models/transaction"),
    User        = require("../models/user")

var middlewareObj = {}

middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/users/login");
    }
}

middlewareObj.isAssetCreator =  function (req, res, next) {
    if(req.isAuthenticated()){
        Asset.findById(req.params.id, function(err, asset){
            if(err){ 
                
                res.redirect("back");
            } else{
                if(asset.creator.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back")
                }
            }
        })
    } else{
        res.redirect("back")
    }
}

module.exports = middlewareObj;