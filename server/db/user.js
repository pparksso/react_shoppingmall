const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  no: {
    type: Number,
  },
  email: {
    type: String,
    unique: 1,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  zipCode: {
    type: Number,
  },
  address01: {
    type: String,
  },
  address02: {
    type: String,
  },
  tel: {
    type: Number,
  },
  cart: {
    type: Array,
    default: [],
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema, "user");
