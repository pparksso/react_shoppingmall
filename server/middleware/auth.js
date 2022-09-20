const jwt = require("jsonwebtoken");
const userDb = require("../db/user");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.auth;
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    userDb.findOne({ _id: verify.id, token: token }, (err, result) => {
      if (!result) return res.json({ message: "로그아웃 되었습니다. 다시 로그인 해주세요" });
      req.user = result;
      next();
    });
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
};

module.exports = auth;
