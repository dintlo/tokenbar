var Asset       = require("../models/asset"),
    Wallet      = require("../models/wallet"),
    Transaction = require("../models/transaction"),
    User        = require("../models/user"),
    forge = require('node-forge');

//create default values for transcation
var newTransaction = {
    buyerKey: "",
    sellerKey: "",
    currencyToken: "",
    assetToken: "",
    exchangeRate: 0,
    currencyAmount: 0,
    assetAmount: 0,
    status: "",
    isSuccessful: false,
    buyer: {},
    asset:{}
};

var transactionService = {}

//very horrible implementation of transaction service, just for bootstraping purposes.
transactionService.createTransaction = function (req, callback) {
        
        //craeate default values for transcation
        
        var userHasWallet = false;

        Asset.findById(req.params.id, function(err, asset){
            if(err){
                console.log(err);
            } else {

                newTransaction = {
                    buyerKey: "",
                    sellerKey: "",
                    currencyToken: req.body.currencyToken,
                    assetToken: req.body.token,
                    exchangeRate: req.body.tokenPrice,
                    currencyAmount: Number(req.body.amount),
                    assetAmount:Number(req.body.amount)/req.body.tokenPrice,
                    status: "Transaction failed.",
                    isSuccessful: false,
                    buyer:req.user,
                    asset:asset
                };
                
                //check if user already has a wallet for asset token
                req.user.wallets.forEach(wallet => {
                    if(wallet.token==asset.token){
                        userHasWallet = true;
                    }
                });
                //create a wallet for the user compatible the asset token they want to buy.
                if(!userHasWallet){
                    var assetKeys = generateKeys();
                    req.user.wallets.push(
                        {
                            token: asset.token,
                            publicKey: assetKeys.public,
                            privateKey: assetKeys.private,
                            balance: 0,
                        }
                    );
                }
               
                //update both asset and user wallets
                assetTransfer(asset.wallets, newTransaction.exchangeRate, newTransaction.currencyAmount, newTransaction.assetToken, function(){
                    userTransfer(req.user.wallets, newTransaction.exchangeRate, newTransaction.currencyAmount, newTransaction.assetToken, function(){
                    
                        asset.tokenAvail = asset.tokenAvail - newTransaction.currencyAmount;
                        asset.owners.push(req.user);
                        req.user.portfolio.push(asset);
                        User.findOneAndUpdate({_id: req.user._id},req.user, function(err, newUser){
                            if(err){
                                console.log(err);
                            } else {
                        
                                Asset.findOneAndUpdate({_id: asset.id},asset, function(err, newAsset){
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
            item.balance = item.balance + amount/price;
        }
        if(item.token==token){
            newTransaction.sellerKey = item.publicKey;
            item.balance = item.balance - amount;
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
            item.balance = item.balance - amount/price;
        }
        if(item.token==token){
            newTransaction.buyerKey = item.publicKey;
            item.balance = item.balance + amount;
        }
        if(itemprocessed == array.length){
            callback();
        }
    });
}

getUserTransaction = function(id, callback){
    Transaction.findById(id, function(err, foundTransactions){
        if(err){
            console.log(err);
        } else {
            callback(foundTransactions);
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
module.exports = transactionService;