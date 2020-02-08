const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  link: {
    type: String,
    trim: true,
    required: "String is required"
  },
  title: {
    type: String,
    trim: true,
    required: "String is required"
  },
  byline: {
    type: String,
    trim: true,
    required: "String is required"
  },
  
});

const Article = mongoose.model("Article", ArticleSchema);



module.exports = Article;