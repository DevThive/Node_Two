require("dotenv").config();
const express = require("express");
const productRouter = require("./routes/products_router.js");
const usersRouter = require("./routes/users.js");

//authRouter

//DB연결
const connect = require("./models");
connect();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api", [usersRouter, productRouter]);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(port, "실행되었습니다.");
});
