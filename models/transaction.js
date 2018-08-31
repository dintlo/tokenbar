var mongoose    = require("mongoose");

//Schema setup

var transactionSchema = mongoose.Schema({
    buyerKey: String,
    sellerKey: String,
    token: String,
    amount: Number
});

module.exports = mongoose.model("Transaction", transactionSchema);