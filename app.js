const express = require("express");
const app = express();
const port = 3000;

const day = require(__dirname + "/date.js");
app.set('view engine', 'ejs');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

const today = day();

app.get("/", function(req, res){
  res.render("index", {date: today, items: items});
});

app.get("/work", function(req, res){
  res.render("index", {date: "Work list", items: workItems})
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/", function(req, res){
  let newItem = req.body.newItem;
  if (req.body.button === "Work"){
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    items.push(newItem);
    res.redirect("/");
  }
});

app.listen(port, function(req, res){
  console.log("Server was started on port: " + port);
});
