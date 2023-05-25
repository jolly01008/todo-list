const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

//==========設定"新增代辦事項頁面"的路由==========
router.get("/new", (req, res) => {
  return res.render("new");
})

//接住使用者在新增代辦事項頁面，form表單打的資料
router.post("/", (req, res) => {
  const userId = req.user._id
  const name = req.body.name;
  return Todo.create({ name , userId })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
})

//==========設定"瀏覽單筆詳細資料"的路由==========
router.get("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  return Todo.findOne({ _id , userId})
    .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((error) => console.log(error));
})

//==========設定"Edit頁面"的路由==========
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  return Todo.findOne({ _id , userId }) //controller呼叫Todo model，Todo model把網址上的id傳給資料庫
    .lean()
    .then((todo) => res.render("edit", { todo })) //要求view取出edit頁面，view取出edit樣板
    .catch((error) => console.log(error));
})

//從"Edit頁面"運用form系列標籤特性，讓使用者更改名字後，所運作的程式碼
//這個路由用來接住表單資料，並送往資料庫，就是CRUD裡的Update
router.put("/:id", (req, res) => {
  console.log(req.body)
  const userId = req.user._id
  const _id = req.params.id
  const { name , isDone } = req.body //解構賦值，把req.body每一項屬性都拿出存成變數
  return Todo.findOne({ _id , userId}) //從Todo model找到單筆資料
    .then((todo) => {
      todo.name = name; //取得客戶端修改的name，存到該筆todo的name
      todo.isDone = isDone === "on" // 取得客戶端的isDone進行條件式比對，再更新資料庫的資料
      return todo.save(); //該筆todo資料存到資料庫
    })
    .then(() => res.redirect(`/todos/${_id}`)) //若儲存成功，則導向"單筆詳細資料"頁面
    .catch((error) => console.log(error));
})

//delete功能
router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  Todo.findOne({ _id , userId })
    .then((todo) => todo.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
})

module.exports = router  //匯出路由器