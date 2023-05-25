const mongoose = require("mongoose") //載入mongoose

//加入這段code，僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

//設定連線到mongoDB。程式跑到這行時，會與資料庫連線
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("mongodb connected!")
})

module.exports = db