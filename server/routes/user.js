const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userDb = require("../db/user");
const countDb = require("../db/count");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/isLogined", auth, (req, res) => {
  try {
    res.status(200).json({ auth: true });
  } catch (err) {
    res.status(500);
  }
});
router.post("/join", async (req, res) => {
  try {
    const email = await req.body.email;
    const password = await req.body.password;
    const name = await req.body.name;
    const tel = await req.body.tel;
    const zipCode = await req.body.zipCode;
    const address01 = await req.body.address01;
    const address02 = await req.body.address02;
    const userCount = await countDb.findOneAndUpdate({ name: "user" }, { $inc: { count: 1 } });
    const pwHash = await bcrypt.hash(password, saltRounds);
    const newUser = await userDb.create({
      email,
      password: pwHash,
      name,
      no: userCount.count + 1,
      tel,
      zipCode,
      address01,
      address02,
    });
    return res.json({ join: true });
  } catch (err) {
    res.status(500).json({ join: false });
  }
});
router.post("/emailCheck", async (req, res) => {
  try {
    const email = await req.body.email.trim();
    const emailCheck = await userDb.findOne({ email });
    if (emailCheck) {
      return res.json({ emailCheck: false, message: "이미 가입 된 이메일 입니다." });
    } else {
      res.json({ emailCheck: true });
    }
  } catch (err) {
    res.status(500).json({ check: false });
  }
});
router.post("/login", async (req, res) => {
  try {
    const email = await req.body.email;
    const password = await req.body.password;
    const findEmail = await userDb.findOne({ email });
    if (findEmail) {
      bcrypt.compare(password, findEmail.password).then((result) => {
        if (result) {
          const token = jwt.sign({ id: findEmail._id }, process.env.JWT_SECRET);
          userDb.updateOne({ email: findEmail.email }, { $set: { token } }, (err, result) => {
            res.cookie("auth", token, { maxAge: 1000 * 60 * 24 * 24 }).json({ login: true, name: findEmail.name });
          });
        } else {
          res.json({ message: "비밀번호가 틀렸습니다.", login: false });
        }
      });
    } else {
      res.json({ message: "등록된 이메일이 아닙니다.", login: false });
    }
  } catch (err) {
    res.status(500).json({ message: "서버 오류입니다." });
  }
});
router.post("/logout", (req, res) => {
  try {
    const token = req.body.token;
    userDb.updateOne({ token }, { $unset: { token: "" } }, (err, result) => {
      res.json({ logout: true });
    });
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
});
router.post("/withdrawal", auth, async (req, res) => {
  try {
    const email = await req.body.email;
    const password = await req.body.password;
    const hashPw = await userDb.findOne({ email });
    bcrypt.compare(password, hashPw.password).then((result) => {
      if (!result) return res.json({ message: "비밀번호가 틀렸습니다." });
      userDb.deleteOne({ email }, (err, result) => {
        res.json({ delete: true });
      });
    });
  } catch (err) {
    res.status(500).json({ messate: "서버 오류" });
  }
});
router.post("/mypage", auth, (req, res) => {
  const user = req.user;
  res.json({ user });
});
router.post("/editinfo", auth, async (req, res) => {
  try {
    const password = await req.body.password;
    const email = await req.body.email;
    const name = await req.body.name;
    const tel = await req.body.tel;
    const zipCode = await req.body.zipCode;
    const address01 = await req.body.address01;
    const address02 = await req.body.address02;
    const findEmail = await userDb.findOne({ email });
    bcrypt.compare(password, findEmail.password).then((result) => {
      if (result) {
        userDb.updateOne({ email }, { $set: { name, tel, zipCode, address01, address02 } }, (err, result) => {
          res.json({ edit: true });
        });
      } else {
        res.json({ message: "비밀번호가 틀렸습니다.", edit: false });
      }
    });
  } catch (err) {
    res.status(500).json({ edit: false, err });
  }
});
module.exports = router;
