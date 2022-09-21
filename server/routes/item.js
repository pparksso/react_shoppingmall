const express = require("express");
const router = express.Router();
const itemDb = require("../db/item");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  try {
    const no = parseInt(req.query.no);
    itemDb.findOne({ no }, (err, result) => {
      res.json({ result });
    });
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
});
router.get("/category/:category", (req, res) => {
  try {
    const category = req.params.category;
    if (category == "all") {
      itemDb.find({}, (err, result) => {
        res.json({ item: result });
      });
    } else if (category == "female") {
      itemDb.find({ category: { $in: ["female01", "female02", "female03", "female04"] } }, (err, result) => {
        res.json({ item: result });
      });
    } else if (category == "male") {
      itemDb.find({ category: { $in: ["male01", "male02", "male03", "male04"] } }, (err, result) => {
        res.json({ item: result });
      });
    } else {
      itemDb.find({ category }, (err, result) => {
        res.json({ item: result });
      });
    }
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
});
router.get("/best", async (req, res) => {
  try {
    const items = await itemDb.find().sort({ views: -1 }).limit(5);
    res.json({ items });
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
});
module.exports = router;
