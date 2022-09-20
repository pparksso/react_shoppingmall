const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: 1,
  },
  password: {
    type: String,
  },
  no: {
    type: Number,
  },
  cart: {
    type: Array,
    default: [],
  },
  name: {
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema, "user");
