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
});

module.exports = mongoose.model("Asset", assetSchema);