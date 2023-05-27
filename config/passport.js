const passport = require("passport") //載入passport
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs") //引用bcryptjs套件

const User = require('../models/user')  //載入 User model

module.exports = app =>{
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email'} , (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!'})
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(!isMatch){
              return done(null , false ,{message: 'Email or Password incorrect.'})
            }
          return done(null , user)
          })
      })
      .catch(err => done(err, false))
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}

