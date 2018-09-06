var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    location:{
        country: String,
        city: String,
        address: String,
        postalCode: Number
    },
    gallery: {
        mainUrl: String,
        image1: String,
        image2: String,
        image3: String,
        image4: String
    },
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
    myAssets :[{
        title: String,
    type: String,
    description: String,
    detailedDescription: String,
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
        username:String,
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
    }]
    }],
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }
    ],
    portfolio: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset"
        }
    ],
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);