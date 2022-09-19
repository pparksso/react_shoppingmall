const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const cookie = require("cookie-parser");
const cors = require("cors");
const cartRouter = require("./routes/cart");

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "shop",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(cors());
app.set("port", process.env.PORT || 8099);

app.get("/", (req, res) => {
  res.send("hi node");
});

app.use("/user", userRouter);
app.use("/cart", cartRouter);

const PORT = app.get("port");
app.listen(PORT, () => {
  console.log(PORT + "포트");
});
