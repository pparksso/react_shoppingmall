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

module.exports = router;
