const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({  
    publisherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher",
    },
    title: String,
    imageUrl: String,
    body: Array,
    createdAt : Date,
  });

  module.exports = NewsSchema;