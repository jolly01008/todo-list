//載入express框架
const express = require("express");
//載入mongoose
const mongoose = require("mongoose");
//設定連接埠
const port = 3000;
//載入handlebars
const exphbs = require("express-handlebars");

//啟動Express應用程式伺服器，設定app代表伺服器
const app = express();

//載入TodoModel
const Todo = require("./models/todo");
//引用pody-parser
const bodyParser = require("body-parser");

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
app.engine("hbs", exphbs({ defaultLayouts: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

//==========設定index路由==========;
app.get("/", (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .sort({_id : "asc"}) //mongoose提供的排序方法。也可用desc
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((todos) => res.render("index", { todos })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)); // 錯誤處理
});

//==========設定"新增代辦事項頁面"的路由==========
app.get("/todos/new", (req, res) => {
  return res.render("new");
});

//設定bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
//接住使用者在form表單打的資料
app.post("/todos", (req, res) => {
  const name = req.body.name;
  return Todo.create({ name })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

//==========設定"瀏覽單筆詳細資料"的路由==========
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((error) => console.log(error));
});

//==========設定"Edit頁面"的路由==========
app.get("/todos/:id/edit", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id) //controller呼叫Todo model，Todo model把網址上的id傳給資料庫
    .lean()
    .then((todo) => res.render("edit", { todo })) //要求view取出edit頁面，view取出edit樣板
    .catch((error) => console.log(error));
});

//從"Edit頁面"運用form系列標籤特性，讓使用者更改名字後，所運作的程式碼
//這個路由用來接住表單資料，並送往資料庫，就是CRUD裡的Update
app.post("/todos/:id/edit", (req, res) => {
  console.log(req.body)
  const id = req.params.id
  const { name , isDone } = req.body //解構賦值，把req.body每一項屬性都拿出存成變數
  return Todo.findById(id) //從Todo model找到單筆資料
    .then((todo) => {
      todo.name = name; //取得客戶端修改的name，存到該筆todo的name
      todo.isDone = isDone === "on" // 取得客戶端的isDone進行條件式比對，再更新資料庫的資料
       
      return todo.save(); //該筆todo資料存到資料庫
    })
    .then(() => res.redirect(`/todos/${id}`)) //若儲存成功，則導向"單筆詳細資料"頁面
    .catch((error) => console.log(error));
});

//delete功能
app.post("/todos/:id/delete", (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

//伺服器監聽 port 3000
app.listen(port, () => {
  console.log("Run todo-list Project http://localhost:3000");
});
