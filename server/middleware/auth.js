const jwt = require("jsonwebtoken");
const userDb = require("../db/user");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.auth;
    if (token) {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      userDb.findOne({ _id: verify.id, token: token }, (err, result) => {
        if (!result) return res.json({ auth: false });
        console.log(result);
        req.user = result;
        next();
      });
    } else if (!token) {
      res.json({ auth: false });
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "서버 오류" });
  }
};

module.exports = auth;
