const express = require("express");
const router = express.Router();
const itemDb = require("../db/item");
const userDb = require("../db/user");
const auth = require("../middleware/auth");
const axios = require("axios");

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
router.post("/cartview", async (req, res) => {
  const token = await req.body.token;
  try {
    let cartArr = [];
    let itemArr = [];
    const user = await userDb.findOne({ token });
    if (user.cart.length > 0) {
      user.cart.forEach((item) => {
        cartArr.push(item.no);
      });
      itemDb.find({ no: { $in: cartArr } }, (err, result) => {
        itemArr.push(result);
        res.json({ cart: itemArr, quantity: user.cart, email: user.email });
      });
    } else {
      res.json({ cart: false });
    }
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
});
router.post("/del", auth, async (req, res) => {
  const no = parseInt(req.body.no);
  const email = req.user.email;
  try {
    await userDb.updateOne({ email }, { $pull: { cart: { no: no } } });
    res.json({ delete: true });
  } catch (err) {
    res.status(500).json({ delete: false });
  }
});
router.post("/pay", async (req, res) => {
  const email = await req.body.partner_user_id;
  try {
    await userDb.updateOne({ email }, { $set: { cart: [] } });
    res.json({ pay: true });
  } catch {
    res.status(500);
  }
});
module.exports = router;
