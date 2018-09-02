var Asset       = require("../models/asset"),
    Wallet      = require("../models/wallet"),
    Transaction = require("../models/transaction"),
    User        = require("../models/user")

var tokenizationService = {}

tokenizationService.createAsset = function (req) {
    var newAsset = {
        name: req.body.name, type: req.body.type, location: req.body.location, 
        description:req.body.description, image: req.body.image, tokenAvail: req.body.tokenCap,
        token: req.body.token, tokenCap: req.body.tokenCap, tokenPrice: req.body.tokenPrice,
        wallets:[
            {
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

module.exports = tokenizationService;