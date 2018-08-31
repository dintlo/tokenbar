var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Asset       = require("./models/assets"),
    seedDB      = require("./seed.js");
    
seedDB();
mongoose.connect("mongodb://localhost/tokenbar");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.use(express.static("public"));

//Landing page
app.get("/", function(req, res){
    res.render("landing");
});

//Asset:Get
app.get("/assets", function(req, res){
    
    Asset.find({}, function(err, assets){
        if(err){
            console.log(err);
        } else {
            res.render("assets", {assets:assets});
        }
    })
})

//Asset:Post
app.post("/assets", function(req, res){
    var newAsset = {name: req.body.name, type: req.body.type, location: req.body.location, description:req.body.description, image: req.body.image};
    Asset.create(newAsset, function(err, newlyAsset){
        if(err){
            console.log(err);
        } else {
            res.redirect("/assets");
        }
    })
});

//Asset:New
app.get("/assets/new", function(req, res){
    res.render("new");
})

//Asset:Show
app.get("/asset/:id", function(req, res){
    Asset.findById(req.params.id, function(err, asset){
        if(err){
            console.log(err);
        } else {
            res.render("show", {asset: asset})
        }
    })
})

//About:Get
app.get("/about", function(req, res){
    res.render("about");
})

app.listen(3005, function(){
    console.log("Tokenbar server has started!!!")
})