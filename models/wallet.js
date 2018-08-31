var mongoose    = require("mongoose");

//Schema setup

var walletSchema = mongoose.Schema({
    token: String,
    balance: Number,
    publicKey: String,
    privateKey: String,
});

module.exports = mongoose.model("Wallet", walletSchema);