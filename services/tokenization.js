var Asset       = require("../models/asset"),
    Wallet      = require("../models/wallet"),
    Transaction = require("../models/transaction"),
    User        = require("../models/user"),
    SHA256      = require('crypto-js/sha256')

var tokenizationService = {}

tokenizationService.createAsset = function (req) {
    var newAsset = {
        name: req.body.name, 
        type: req.body.type, 
        location: req.body.location, 
        description:req.body.description, 
        image: req.body.image,
        tokenAvail: req.body.tokenCap,
        token: req.body.token, 
        tokenCap: req.body.tokenCap, 
        tokenPrice: req.body.tokenPrice,
        wallets:[{
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
    return newAsset;
}

tokenizationService.getAssetsById = function(id, callback){
   
    User.findOne({_id: id}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            // var assets = foundUser.assets.map(function(assets) { return assets; });
            var assets = JSON.parse(JSON.stringify(foundUser.assets));
            
            console.log(assets.name)
            callback(assets);
        }
    })
}

tokenizationService.getAssetsByPublicAddress = function(address, callback){
    Asset.find({'transactions.publicKey': address}, function(err, assets){
        if(err){
            console.log(err);
        } else {
            callback(assets);
        }
    })
}



module.exports = tokenizationService;