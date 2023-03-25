const express = require('express') // 引用 Express
const router = express.Router()  // 引用 Express 路由器

const home = require('./modules/home') //載入home.js檔案
const todos = require('./modules/todos') //載入todos.js檔案

router.use( '/' , home )  // 將網址結構符合 / 字串的 request 導向 home 模組 
router.use( '/todos' , todos )  // 將網址結構符合 /todos 字串的 request 導向 todos 模組 

module.exports = router  //匯出路由器