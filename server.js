const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const colors = require("colors");
const db = require("./models");
const path = require("path");

const app = express();

mongoose.connect("mongodb://localhost/scrapedb", {useNewUrlParser:true, useUnifiedTopology: true})

const connection = mongoose.connection;

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/scrapedb";

const PORT = process.env.PORT || 4000; 

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
    console.log("connected to db instance");
    
});

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.static("./views"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(logger("dev"));

app.listen(PORT, () => {
    console.log(`listening at: http://localhost:${PORT}`);
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get("/saved", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/saved.html"));
})



// GET request for scraping huffington post 

app.get("/scrape",(req, res) =>{
    
    axios.get("https://www.huffpost.com/").then(urlResponse => {
        const $ = cheerio.load(urlResponse.data);
    
        let counter = 0; 

        $("div.card__headlines").each((i, element) => {

            let result = {};

            const url = $(element).find("a").attr("href");

            const header = $(element).find("a").text();

            console.log(header.yellow);
            console.log(link.cyan);
            console.log("----------------------\n");

            result.headline = header;
            result.link = url;

            if (result.headline && result.link) {
                
                db.Article.create(result).then(function (dbArticle) {
                    console.log(dbArticle);
                    counter++;
                    console.log("added" + counter + "new items");
                    
                })
                    .catch(function (err) {
                        return res.json(err);
                    });
                console.log(result);
            }       
        })
    });
});


// Get route to grab articles from db

app.get("/articles", (req, res) => {
    db.Article.find({})
        .then((dbArticle) => {
            res.json(dbArticle);
        })
        .catch((err) => {
            res.json(err);
        })
});