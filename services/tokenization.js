var Asset       = require("../models/asset"),
    Wallet      = require("../models/wallet"),
    Transaction = require("../models/transaction"),
    User        = require("../models/user"),
    forge = require('node-forge');

var tokenizationService = {}

tokenizationService.createAsset = function (req) {
    var nltkeys = generateKeys();
    var assetkeys = generateKeys();

    var newAsset = {
        title: req.body.title, 
        type: req.body.type, 
        location:{
            country: req.body.country,
            city: req.body.city
        }, 
        gallery:{
            mainUrl: req.body.mainUrl
        },
        description:req.body.description,
        detailedDescription: req.body.detailedDescription, 
        tokenAvail: req.body.tokenCap,
        token: req.body.token, 
        tokenCap: req.body.tokenCap, 
        tokenPrice: req.body.tokenPrice,
        tokenRoiDescription: req.body.tokenRoiDescription,
        tokenRoiAmount: req.body.tokenRoiAmount,
        tokenRoiInterval: req.body.tokenRoiInterval,
        wallets:[{
            token: req.body.token,
            balance: req.body.tokenCap,
            publicKey: assetkeys.public,
            privateKey: assetkeys.private,
        },
        {
            token: "NLT",
            balance: 0,
            publicKey: nltkeys.public,
            privateKey: nltkeys.private,
        }],
        creator: {
            id:req.user.id
        }
    };
    Asset.create(newAsset, function(err, newlyAsset){
        if(err){
            console.log(err);
        } else {
            
            var updatedUser = req.user.myAssets.push(newlyAsset);
            User.findByIdAndUpdate(req.user._id,updatedUser, function(err, newUser){
                if(err){
                    console.log(err);
                } else {
                    return newlyAsset;
                }
            })
        }
    })
    
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

function generateKeys () {
    var keypair = forge.rsa.generateKeyPair({bits: 1024});

keypair = {
    public: fix(forge.pki.publicKeyToRSAPublicKeyPem(keypair.publicKey, 72)),
    private: fix(forge.pki.privateKeyToPem(keypair.privateKey, 72))
  }


return keypair;
}

function fix (str) {
    var r = str.replace('-----BEGIN RSA PUBLIC KEY-----','');
    return r.replace('-----END RSA PUBLIC KEY-----','')
}




module.exports = tokenizationService;