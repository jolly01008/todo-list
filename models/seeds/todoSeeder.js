
const Todo = require("../todo") //載入todo model
const db = require('../../config/mongoose') //引入mongooseDB連線設定

db.once("open", () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` });
  }

  console.log("done.");
});
