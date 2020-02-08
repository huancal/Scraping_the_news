const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose")
const db = require("./models")
console.log(db)
mongoose.connect("mongodb://localhost/scrapedb", {useNewUrlParser:true, useUnifiedTopology: true})//.then(d=>console.log(d))

axios.get("https://voices.berkeley.edu/").then(urlResponse => {
    const $ = cheerio.load(urlResponse.data);
       let counter=0
    $("div.views-field-title").each((i, element) => {
        let href= $(element).children().children().attr("href")
        let title= $(element).children().children().text()
        let author= $(element).siblings(".views-field-nothing").find("a").text()
        //console.log(counter, "--------", $(element).children().children().text())//grab image
        db.Article.create({ link: href, title: title, byline: author }).then(data=>console.log(data))
        counter ++
    })
});
