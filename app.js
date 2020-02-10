const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");
const colors = require("colors");
const db = require("./models");


console.log(db)
mongoose.connect("mongodb://localhost/scrapedb", {useNewUrlParser:true, useUnifiedTopology: true})

// axios.get("https://www.motor1.com/").then(urlResponse => {
//     const $ = cheerio.load(urlResponse.data);
//     $("div.views-field-title").each((i, element) => {
//         let href= $(element).children().children().attr("href")
//         let title= $(element).children().children().text()
//         let author= $(element).siblings(".views-field-nothing").find("a").text()
//         //console.log(counter, "--------", $(element).children().children().text())//grab image
//         db.Article.create({ link: href, title: title, byline: author }).then(data=>console.log(data))
//     })
// });

axios.get("https://www.huffpost.com/").then(urlResponse => {
    const $ = cheerio.load(urlResponse.data);
    

    $("div.card__headlines").each((i, element) => {
        const link = $(element).find("a").attr("href");

        const header = $(element).find("a").text();

        console.log(header.yellow);
        console.log(link.cyan);
        console.log("----------------------\n");
    })

    $("picture").each((i, element) => {
        const image = $(element).find("source").attr("srcset")
        console.log(image);
        console.log("----------------------\n");

        
    })
    
    
});

