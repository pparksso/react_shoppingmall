const express = require("express");
const router = express.Router();
const itemDb = require("../db/item");
const userDb = require("../db/user");
const auth = require("../middleware/auth");

router.post("/", (req, res) => {
  try {
    const itemNo = parseInt(req.body.no);
    const quantity = parseInt(req.body.count);
    const token = req.body.token;
    userDb.findOne({ token }, (err, result) => {
      let duplicate = false;
      result.cart.forEach((item) => {
        if (item.no === itemNo) {
          duplicate = true;
        }
      });
      if (duplicate) {
        return res.json({ add: false, message: "이미 장바구니에 있습니다." });
      } else {
        userDb.updateOne(
          { token },
          {
            $push: {
              cart: {
                no: itemNo,
                quantity: quantity,
              },
            },
          },
          (err,
          (result) => {
            return res.json({ cart: true });
          })
        );
      }
    });
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
});
router.get("/cartview", auth, async (req, res) => {
  try {
    let cartArr = [];
    let itemArr = [];
    const user = await req.user;
    if (req.user.cart.length > 0) {
      await req.user.cart.forEach((item) => {
        cartArr.push(item.no);
      });
      itemDb.find({ no: { $in: cartArr } }, (err, result) => {
        itemArr.push(result);
        res.json({ items: itemArr });
      });
    } else {
      res.json({ cart: false });
    }
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
