//載入express框架
const express = require("express");
//啟動Express應用程式伺服器，設定app代表伺服器
const app = express();
//設定連接埠
const port = 3000;

//設定路由
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//伺服器監聽 port 3000
app.listen(port, () => {
  console.log("run todo list project http://localhost:3000");
});
