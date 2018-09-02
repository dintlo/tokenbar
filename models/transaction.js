var mongoose    = require("mongoose");

//Schema setup

var transactionSchema = mongoose.Schema({
    buyerKey: String,
    sellerKey: String,
    currencyToken: String,
    assetToken: String,
    amount: Number,
    status: String,
    isSuccessful: Boolean
});

module.exports = mongoose.model("Transaction", transactionSchema);