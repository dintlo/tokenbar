var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    seedDB              = require("./seed.js"),
    userRoutes          = require("./routes/users"),
    assetRoutes         = require("./routes/assets"),
    indexRoutes         = require("./routes/index"),
    transactionRoutes   = require("./routes/transactions"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    User                = require("./models/user"),
    database            =require("./config/database"),
    port                = process.env.PORT || 3006
    

seedDB();

mongoose.connect("mongodb://tokenbar:4jiasmRVrraiEz8NQDqhL4hFG0w2LJPBU3ogippn47uFjb0lpBg7YOc2Sh0IRQqNK6LBsmEcA253mjLmAfzWAQ==@tokenbar.documents.azure.com:10255/?ssl=true&replicaSet=globaldb" || database.localUrl);

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.use(express.static("public"));

//Configure Passport
app.use(require("express-session")({
    secret : "Sight of Light too Bright to Fight",
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy( User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//push to every page
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

//configure routes
app.use("/", indexRoutes);
app.use("/assets", assetRoutes);
app.use("/transactions", transactionRoutes);
app.use("/users", userRoutes);

app.listen(port, function(){
    console.log("Tokenbar server has started!!!")
})