const mongoose = require('mongoose'),
  Schema = mongoose.Schema
const env = require('dotenv')
require('mongoose-type-email')
env.config()

const exportVersion = () => {
  return new Schema({
    username: { type: String, required: true }, //名字
    account: { type: String, required: true, unique: true }, //line ID
    userpsw: String, //密碼
    email: { type: String, required: true },
    cellphone: { type: String, required: true },
    isAuth: { type: Boolean, default: false },
    img: {
      data: { type: Buffer },
      contentType: { type: String },
    },
  })
}

const User_login_Schema = exportVersion()

const { buf2url } = require('./query')
User_login_Schema.virtual('imgSrc').get(buf2url())

module.exports = mongoose.model('User_login', User_login_Schema)
