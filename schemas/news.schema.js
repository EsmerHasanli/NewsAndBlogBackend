const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({  
    publisherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher",
    },
    title: String,
    image: String,
    body: Object,
    createdAt : Date,
  });

  module.exports = NewsSchema;