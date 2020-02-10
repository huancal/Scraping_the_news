const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  headline: {
    type: String,
    trim: true,
    required: true
  },
  link: {
    type: String,
    trim: true,
    required: true
    },
    saved: {
        type: Boolean,
        default: false
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;