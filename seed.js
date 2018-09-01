var mongoose    = require("mongoose"),
    User       = require("./models/user"),
    Asset       = require("./models/asset"),
    Transaction = require("./models/transaction"),
    Wallet      = require("./models/wallet")

var assetData = [
    {name:"The Rondebosch Estate", 
    type:"Real Estate", 
    location:"Cape Town", 
    description:"A student accomadation",
    token:"RET",
    tokenPrice:0.5,
    tokenCap:1000,
    tokenAvail:1000,
    image:"https://images.unsplash.com/photo-1521847512898-c809c162afdf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=79e9974a081894ac68961e039cd71cd2&auto=format&fit=crop&w=802&q=80"},
    {name:"The Harrowdene Office Park", 
    type:"Real Estate", 
    location:"Woodmead", 
    description:"A Business Park",
    token:"HOP",
    tokenPrice:0.8,
    tokenCap:500,
    tokenAvail:500,
    image:"https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d5d3ab702f0e85bf6ae318a2b4d3f59b&auto=format&fit=crop&w=668&q=80"},
    {name:"Diary Farmhouse", 
    type:"Retail", 
    location:"Boksburg", 
    description:"A Dairy Farmhouse",
    token:"DFT",
    tokenPrice:0.3,
    tokenCap:10000,
    tokenAvail:10000,
    image:"https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7d50be9f2155f55c280b89ad55e66585&auto=format&fit=crop&w=1053&q=80"}
]
function seedDB(){
    //Remove all users
    User.remove({},function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Deleted all user successfully.");
        }
    });

    //Remove all wallets
    Wallet.remove({},function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Deleted all wallets successfully.");
        }
    });

    //Remove all wallets
    Transaction.remove({},function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Deleted all transactions successfully.");
        }
    });

    //Remove Assets
    Asset.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed all Assets in the database.")
            //Create Assets
            assetData.forEach(function(seed){
            Asset.create(seed, function(err, newAsset){
                if(err){
                    console.log(err);
                } else {
                    console.log("Created an  Assets in the database.");
                     //Create a wallet for the asset
                    var wallet ={
                        token: "NLT",
                        balance: 0,
                        publicKey: "1212121212",
                        privateKey: "212121212",
                    }
                   
                    Wallet.create(wallet, function(err, newWallet){
                        if(err){
                            console.log(err);
                        } else {
                            newAsset.wallet = newWallet;
                            newAsset.save();
                            console.log("A new wallet has been created.");
                        }
                    })
                }
            })
    })
        }
    }) 
    
    
    
    
}

module.exports = seedDB;