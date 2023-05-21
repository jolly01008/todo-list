const express = require("express")
const router = express.Router()

const User = require("../../models/user")  //引入User model

router.get('/login', (req,res) => {
  res.render("login")
})

router.post('/login',(req,res) => {
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  //取得註冊表單參數
  const {name , email , password , confirmPassword} = req.body
  User.findOne({ email }).then( user => {
    //如果已經註冊，退回原本畫面
    if(user){
      console.log("User alerady register")
      res.render("register", {
        name,
        email,
        password,
        confirmPassword
      })
    }else{
      //如果還沒註冊，寫入資料庫
      return User.create({
        name , email , password
      })
      .then(() =>  res.redirect("/"))
      .catch(err =>  console.log(err))
    }
  })
  .catch(err => console.log(err))
})

module.exports = router 