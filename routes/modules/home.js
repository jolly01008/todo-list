const express = require('express') // 引用 Express
const router = express.Router()  // 引用 Express 路由器
const Todo = require('../../models/todo') // 載入Todo model

router.get("/", (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({_id : "asc"}) //mongoose提供的排序方法。也可用desc
    .then((todos) => res.render("index", { todos })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)); // 錯誤處理
})


module.exports = router  //匯出路由器