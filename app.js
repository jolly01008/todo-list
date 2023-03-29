
const express = require("express") //載入express框架
const port = 3000 //設定連接埠
const exphbs = require("express-handlebars") //載入handlebars
const bodyParser = require("body-parser") //引用pody-parser
const methodOverride = require("method-override")  //載入method-override

require('./config/mongoose')
const routes = require('./routes')  // 引用路由器

const app = express() //啟動Express應用程式伺服器，設定app代表伺服器
const PORT = process.env.PORT || 3000 // 如果在 Heroku 環境則使用 process.否則為本地環境，使用 3000 env.PORT

//載入handlebars，把樣板引擎指定為Handlebars
app.engine("hbs", exphbs({ defaultLayouts: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(bodyParser.urlencoded({ extended: true })) //設定bodyParser
app.use(methodOverride('_method'))

app.use(routes)  // 將 request 導入路由器

//伺服器監聽 port 3000
app.listen(PORT, () => {
  console.log(`Run todo-list Project http://localhost:${PORT}`);
});
