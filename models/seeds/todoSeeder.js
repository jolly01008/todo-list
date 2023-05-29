const bcrypt = require("bcryptjs") 


const User = require("../user") //載入user model
const Todo = require("../todo") //載入todo model
const db = require('../../config/mongoose') //引入mongooseDB連線設定

const SEED_USER = {
  name : "root",
  email: "root@example.com",
  password: "12345678",
}

db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password , salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email:  SEED_USER.email,
      password: hash 
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 10 },
        (value, i) => 
        Todo.create({ name: `name-${i}`, userId })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})

