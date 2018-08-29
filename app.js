var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/assets", function(req, res){
    var assets = [
        {name:"The Rondebosch Estate", 
        type:"Real Estate", 
        location:"Cape Town", 
        description:"A student accomadation",
        image:"https://images.unsplash.com/photo-1521847512898-c809c162afdf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=79e9974a081894ac68961e039cd71cd2&auto=format&fit=crop&w=802&q=80"},
        {name:"The Harrowdene Office Park", 
        type:"Real Estate", 
        location:"Woodmead", 
        description:"A Business Park",
        image:"https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d5d3ab702f0e85bf6ae318a2b4d3f59b&auto=format&fit=crop&w=668&q=80"},
        {name:"Diary Farmhouse", 
        type:"Retail", 
        location:"Boksburg", 
        description:"A Dairy Farmhouse",
        image:"https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7d50be9f2155f55c280b89ad55e66585&auto=format&fit=crop&w=1053&q=80"}
    ]

    res.render("assets", {assets:assets});
})

app.listen(3005, function(){
    console.log("Tokenbar server has started!!!")
})