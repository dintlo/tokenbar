var mongoose    = require("mongoose");

//Schema setup

var transactionSchema = mongoose.Schema({
    title: String,
    buyer: String,
    seller: String,
    token: String,
    amount: Number,
    asset: String
});

module.exports = mongoose.model("Transaction", transactionSchema);