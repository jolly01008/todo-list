const express = require("express")
const router = express.Router()
const passport = require("passport") // 引用 passport

const User = require("../../models/user")  //引入User model

router.get('/login', (req,res) => {
  res.render("login")
})

router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: 'users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  //取得註冊表單參數
  const {name , email , password , confirmPassword} = req.body
  const errors = []
  if(!name || !email || !password || !confirmPassword){
    errors.push({ message: '所有欄位都是必填。'})
  }
  if(password !== confirmPassword ){
    errors.push({ message: '密碼與確認密碼不相符!'})
  }
  if(errors.length){
    console.log(errors)
    return res.render('register',{
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then( user => {
    //如果已經註冊，退回原本畫面
    if(user){
      errors.push({ message: '這個email已經註冊過了'})
      return res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    //如果還沒註冊，寫入資料庫
    return User.create({
      name , email , password
    })
    .then(() =>  res.redirect("/"))
    .catch(err =>  console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg','你已經成功登出。')
  res.redirect('login')
})

module.exports = router 