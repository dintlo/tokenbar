var Asset       = require("../models/asset"),
    Wallet      = require("../models/wallet"),
    Transaction = require("../models/transaction"),
    User        = require("../models/user")

//craeate default values for transcation
var newTransaction = {
    buyerKey: "",
    sellerKey: "",
    currencyToken: "",
    assetToken: "",
    amount: 0,
    status: "",
    isSuccessful: false,
};

var transactionService = {}

//very horrible implementation of transaction service, just for bootstraping purposes.
transactionService.createTransaction = function (req, callback) {
        
        //craeate default values for transcation
        newTransaction = {
            buyerKey: "",
            sellerKey: "",
            currencyToken: req.body.currencyToken,
            assetToken: req.body.token,
            amount: Number(req.body.amount),
            status: "Transaction failed.",
            isSuccessful: false,
        };

        var userHasWallet = false;

        Asset.findById(req.params.id, function(err, asset){
            if(err){
                console.log(err);
            } else {

                //check if user already has a wallet for asset token
                req.user.wallets.forEach(wallet => {
                    if(wallet.token==asset.token){
                        userHasWallet = true;
                    }
                });
                //create a wallet for the user compatible the asset token they want to buy.
                if(!userHasWallet){
                    req.user.wallets.push(
                        {
                            token: asset.token,
                            publicKey: "3428349328479832",
                            privateKey: "980239840932840932",
                            balance: 0,
                        }
                    );
                }
               
                assetTransfer(asset.wallets, newTransaction.price, newTransaction.amount, newTransaction.assetToken, function(){
                    userTransfer(req.user.wallets, newTransaction.price, newTransaction.amount, newTransaction.assetToken, function(){
                        //update user wallets
                        asset.tokenAvail -= newTransaction.amount;
                        User.findOneAndUpdate({_id: req.user.id},req.user, function(err, newUser){
                            if(err){
                                console.log(err);
                            } else {
                        
                                User.findOneAndUpdate({_id: asset.id},asset, function(err, newAsset){
                                    if(err){
                                        console.log(err);
                                    } else {
                                       
                                        newTransaction.isSuccessful = true;
                                        newTransaction.status = "Transaction successful"
                                        callback(newTransaction);
                                    }
                                }); 
                            }
                        }); 
                    })
                });
            }
        });
       
        
}

assetTransfer = function(assetWallets, price, amount, token, callback){
    //move funds from/to user wallet
    var itemprocessed = 0;
    assetWallets.forEach((item, index, array) =>{
        itemprocessed++;
        if(item.token=="NLT"){
            item.balance += amount*price;
        }
        if(item.token==token){
            newTransaction.sellerKey = item.publicKey;
            item.balance -=  amount;
        }
        if(itemprocessed == array.length){
            callback();
        }
    });
};

userTransfer = function( userWallets, price, amount, token, callback){
    //move funds from/to user wallet
    var itemprocessed = 0;
    userWallets.forEach((item, index, array) =>{
        itemprocessed ++;
        if(item.token=="NLT"){
            item.balance -= amount*price;
        }
        if(item.token==token){
            newTransaction.buyerKey = item.publicKey;
            item.balance += amount;
        }
        if(itemprocessed == array.length){
            callback();
        }
    });
}

module.exports = transactionService;