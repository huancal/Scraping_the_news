const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  headline: {
    type: String,
    trim: true,
    required: "String is required"
  },
  link: {
    type: String,
    trim: true,
    required: "String is required"
  },
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;