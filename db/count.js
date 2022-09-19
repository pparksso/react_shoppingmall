const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  count: {
    type: Number,
  },
});

module.exports = mongoose.model("count", countSchema, "count");
