var mongoose    = require("mongoose");

//Schema setup

var assetSchema = mongoose.Schema({
    title: String,
    type: String,
    description: String,
    location: {
        country: String,
        city: String,
        address: String,
        postalCode: Number,
    },
    gallery: {
        mainUrl: String,
        image1: String,
        image2: String,
        image3: String,
        image4: String
    },
    tokenCap: Number,
    tokenAvail: Number,
    token: String,
    tokenPrice: Number,
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }
    ],
    creator: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    owners: [{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }],
    wallets : [{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Wallet"
        },
        token: String,
        balance: Number,
        publicKey: String,
        privateKey: String,
    }],
});

module.exports = mongoose.model("Asset", assetSchema);