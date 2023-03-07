//載入express框架
const express = require("express");
//載入mongoose
const mongoose = require("mongoose");

//加入這段code，僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//啟動Express應用程式伺服器，設定app代表伺服器
const app = express();
//設定連線到mongoDB。程式跑到這行時，會與資料庫連線
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//設定連接埠
const port = 3000;

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

//設定路由
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//伺服器監聽 port 3000
app.listen(port, () => {
  console.log("Run todo-list Project http://localhost:3000");
});
