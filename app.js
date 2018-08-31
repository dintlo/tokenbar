var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    seedDB      = require("./seed.js"),
    assetRoutes = require("./routes/assets"),
    indexRoutes = require("./routes/index"),
    transactionRoutes = require("./routes/transactions");
    
seedDB();
mongoose.connect("mongodb://localhost/tokenbar");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", indexRoutes);
app.use("/assets", assetRoutes);
app.use("/transactions", transactionRoutes);

app.listen(3005, function(){
    console.log("Tokenbar server has started!!!")
})