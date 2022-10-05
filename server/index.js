const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const itemRouter = require("./routes/item");
const path = require("path");

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
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.static(path.join(__dirname, "/build")));
app.set("port", process.env.PORT || 8099);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/item", itemRouter);

const PORT = app.get("port");
app.listen(PORT, () => {
  console.log(PORT + "포트");
});
