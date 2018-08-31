var mongoose    = require("mongoose");

//Schema setup

var walletSchema = mongoose.Schema({
    title: String,
    token: String,
    balance: String,
});

module.exports = mongoose.model("Wallet", walletSchema);