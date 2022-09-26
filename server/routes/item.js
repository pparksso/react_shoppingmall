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
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    let page = parseInt(req.query.page);
    console.log(page);
    if (!page) {
      page = 1;
    }
    const size = 10;
    const pageGroupSize = 5;
    const skip = (page - 1) * size;
    if (category == "all") {
      const currentItems = await itemDb.find().sort({ no: 1 }).limit(size).skip(skip);
      const totalItems = await itemDb.countDocuments({});
      const totalPage = Math.ceil(totalItems / size);
      const startPage = page - ((page - 1) % pageGroupSize);
      const lastPage = startPage + (pageGroupSize - 1);
      res.json({ currentItems, totalItems, totalPage, startPage, lastPage });
    } else if (category == "female") {
      const currentItems = await itemDb
        .find({ category: { $in: ["female01", "female02", "female03", "female04"] } })
        .sort({ no: 1 })
        .limit(size)
        .skip(skip);
      const totalItems = await itemDb.countDocuments({ category: { $in: ["female01", "female02", "female03", "female04"] } });
      const totalPage = Math.ceil(totalItems / size);
      const startPage = page - ((page - 1) % pageGroupSize);
      const lastPage = startPage + (pageGroupSize - 1);
      res.json({ currentItems, totalItems, totalPage, startPage, lastPage });
    } else if (category == "male") {
      const currentItems = await itemDb
        .find({ category: { $in: ["male01", "male02", "male03", "male04"] } })
        .sort({ no: 1 })
        .limit(size)
        .skip(skip);
      const totalItems = await itemDb.countDocuments({ category: { $in: ["male01", "male02", "male03", "male04"] } });
      const totalPage = Math.ceil(totalItems / size);
      const startPage = page - ((page - 1) % pageGroupSize);
      const lastPage = startPage + (pageGroupSize - 1);
      res.json({ currentItems, totalItems, totalPage, startPage, lastPage });
    } else {
      const currentItems = await itemDb.find({ category }).sort({ no: 1 }).limit(size).skip(skip);
      const totalItems = await itemDb.countDocuments({ category });
      const totalPage = Math.ceil(totalItems / size);
      const startPage = page - ((page - 1) % pageGroupSize);
      const lastPage = startPage + (pageGroupSize - 1);
      res.json({ currentItems, totalItems, totalPage, startPage, lastPage });
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
