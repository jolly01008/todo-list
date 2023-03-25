
const express = require("express") //載入express框架
const mongoose = require("mongoose") //載入mongoose
const port = 3000 //設定連接埠
const exphbs = require("express-handlebars") //載入handlebars

const app = express() //啟動Express應用程式伺服器，設定app代表伺服器

const Todo = require("./models/todo") //載入TodoModel
const bodyParser = require("body-parser") //引用pody-parser
const methodOverride = require("method-override")  //載入method-override

const routes = require('./routes')  // 引用路由器

//加入這段code，僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//設定連線到mongoDB。程式跑到這行時，會與資料庫連線
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

//載入handlebars，把樣板引擎指定為Handlebars
app.engine("hbs", exphbs({ defaultLayouts: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(bodyParser.urlencoded({ extended: true })) //設定bodyParser
app.use(methodOverride('_method'))

app.use(routes)  // 將 request 導入路由器

//伺服器監聽 port 3000
app.listen(port, () => {
  console.log("Run todo-list Project http://localhost:3000");
});
