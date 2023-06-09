module.exports = {
  authenticator: (req, res, next) =>{
    if(req.isAuthenticated()){
      return next()
    }
    req.flash('warning_msg','登入後才能使用，若尚註冊請點擊Register進行註冊。')
    res.redirect('/users/login')
  }
}