var mongoose    = require("mongoose");

//Schema setup

var transactionSchema = mongoose.Schema({
    buyerKey: String,
    sellerKey: String,
    buyer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    asset: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset"
        }
    ],
    currencyToken: String,
    assetToken: String,
    exchangeRate: Number,
    currencyAmount: Number,
    assetAmount: Number,
    status: String,
    isSuccessful: Boolean
});

module.exports = mongoose.model("Transaction", transactionSchema);