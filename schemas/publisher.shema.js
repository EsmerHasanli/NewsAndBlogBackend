const mongoose = require("mongoose");

const PublishersSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    backgroundImg: String,
    profileImg: String,
    name: String,
    description: String,
    joinedDate : Date,
  });

  module.exports = PublishersSchema;