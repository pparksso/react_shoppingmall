const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  no: {
    type: Number,
  },
  image: {
    type: Array,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
  },
  size: {
    type: String,
  },
  views: {
    type: Number,
  },
});

module.exports = mongoose.model("item", itemSchema);
