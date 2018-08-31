var mongoose    = require("mongoose");

//Schema setup

var assetSchema = mongoose.Schema({
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
    wallet : {
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Wallet"
        },
        token: String,
        balance: String,
        publicKey: Number,
        privateKey: Number,
    },
});

module.exports = mongoose.model("Asset", assetSchema);