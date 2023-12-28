const mongoose = require('mongoose');
const NewsSchema = require('../schemas/news.schema.js')

const NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;