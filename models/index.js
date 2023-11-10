require("dotenv").config();
const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_IP)
    .then(() => console.log("mongodb 연결 성공")),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
};
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

module.exports = connect;
