var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    country: String,
    password: String,
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
    assets :[{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Asset"
        },
        name: String,
    type: String,
    description: String,
    location: String,
    image: String,
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
    }]
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);