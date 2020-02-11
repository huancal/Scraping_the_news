const express = require("express");
const exphbs = require("express-handlebars")
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const db = require("./models/index.js");
const app = express();

// mongoose.connect("mongodb://localhost/scrapedb", {useNewUrlParser:true, useUnifiedTopology: true})

const connection = mongoose.connection;

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/scrapedb";

const PORT = process.env.PORT || 3000; 

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   });

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
    console.log("connected to db instance");
    
});

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('index', __dirname + '/views');

var results = [];

app.get("/", function (req, res) {
    db.Article.find({ saved: false }, function (err, result) {
        if (err) throw err; 
        res.render("index", {result})
    })
})


// GET request for scraping huffington post 

app.get("/scrape",function (req, res){
    
    axios.get("https://www.huffpost.com/").then(urlResponse => {
        const $ = cheerio.load(urlResponse.data);

        $("div.card__headlines").each((i, element) => {
            const url = $(element).find("a").attr("href");
            const header = $(element).find("a").text();
            console.log(header.yellow);
            console.log(link.cyan);
            console.log("----------------------\n");
            if (url && header) {
                results.push({
                    url: url,
                    header: header
                })   
            }     
        })
        db.Article.create(result)
            .then(function (dbArticle) {
                res.render("index", { dbArticle });
                console.log(dbArticle);
        })
            .catch(function (err) {
                console.log(err);
                
            });
        app.get("/", function (req, res) {
            res.render("index")
        })
    });
});


// Get route to grab articles from db

app.get("/saved", function (req, res) {
    let savedArticles = []
    db.Article.find({ saved: true }, function (er, saved) {
        if (err) throw err; 
        savedArticles.push(saved)
        res.render("saved", {saved})
    })      
});

app.listen(PORT, () => {
    console.log(`listening at: http://localhost:${PORT}`);
});