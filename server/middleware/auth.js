const jwt = require("jsonwebtoken");
const userDb = require("../db/user");

const auth = (req, res, next) => {
  try {
    // const token = req.cookies.auth;
    const token = req.body.token;
    console.log(token);
    if (token) {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      userDb.findOne({ _id: verify.id }, (err, result) => {
        console.log(result);
        if (!result) return res.json({ auth: false });
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
