const Login = require('../../../Schemas/user_login')
const Pending = require('../../../Schemas/user_pending')
const crypto = require('crypto')
const { parseImg } = require('../../../Schemas/query')
const { ErrorHandler, dbCatch } = require('../../../error')
const asyncHandler = require('express-async-handler')
const env = require('dotenv')
env.config()

/**
 * @api {post} /register register
 * @apiName Register
 * @apiGroup Out/account
 * @apiDescription 註冊(by lineID & email)
 * 
 * @apiHeaderExample {json} config
                 { "content-type": "multipart/form-data" }
 *
 * @apiparam {String} account lineID
 * @apiparam {String} password 密碼(以後建議在前端加密)
 * @apiparam {String} ConfirmPassword 二次密碼
 * @apiparam {String} username 使用者名字
 * @apiparam {String} Email 信箱
 * 
 * @apiSuccess (201) {String} username 姓名
 * @apiSuccess (201) {String} email
 * 
 * @apiError (400) {String} description 請添加照片
 * @apiError (403) {String} description 帳號已被註冊
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */
const register = async (req, res) => {
  const { account, cellphone, Email } = req.body
  const isRegistered = await Login.find({
    $or: [{ account }, { cellphone }, { email: Email }],
  }).catch(dbCatch)
  console.log(isRegistered)
  if (isRegistered.length !== 0) {
    throw new ErrorHandler(
      403,
      `此${
        isRegistered.account === account ? 'ID' : isRegistered.email === Email ? '信箱' : '手機號碼'
      }已被註冊`,
    )
  }

  const { username, password } = req.body
  const newPsw = crypto.createHash('md5').update(password).digest('hex')

  const active = Math.random().toString(36).substring(2)
  const data = {
    username,
    account,
    userpsw: newPsw,
    email: Email,
    cellphone,
    active,
    img: parseImg(req.file),
  }
  await Pending.findOneAndUpdate({ account }, data, {
    upsert: true,
    useFindAndModify: false,
  }).catch(dbCatch)
  res.status(201).send({ username })
}

const valid = require('../../../middleware/validation')
const rules = ['password', { filename: 'required', field: 'username' }, 'Email', 'ConfirmPassword']

const exportVersion = () => {
  return [valid(rules), asyncHandler(register)]
}
module.exports = exportVersion()
