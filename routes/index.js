const express = require('express') // 引用 Express
const router = express.Router()  // 引用 Express 路由器

const home = require('./modules/home') //載入home.js檔案
const todos = require('./modules/todos') //載入todos.js檔案
const users = require('./modules/users')  //載入users.js檔案模組
const auth = require('./modules/auth') //引用auth模組
const { authenticator } = require('../middleware/auth') //掛載 middleware

router.use('/todos' ,authenticator, todos )  // 將網址結構符合 /todos 字串的 request 導向 todos 模組 。加入驗證程序
router.use('/users', users) //結構網址若符合 /users 。導向users模組
router.use('/auth' , auth) //掛載模組
router.use('/' ,authenticator ,home )  // 將網址結構符合 / 字串的 request 導向 home 模組 。加入驗證程序

module.exports = router  //匯出路由器