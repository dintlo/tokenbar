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
        balance: String,
        publicKey: String,
        privateKey: String,
    }],
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);