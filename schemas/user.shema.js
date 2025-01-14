const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    username: String,
    fullName: String,
    profileImg: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    isVerified: Boolean
  });

module.exports = UsersSchema