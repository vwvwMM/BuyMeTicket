const { dbCatch, ErrorHandler } = require('../../../../error')
const Login = require('../../../../Schemas/user_login')
const Pending = require('../../../../Schemas/user_pending')
const Visual = require('../../../../Schemas/user_visual')
const Activity = require('../../../../Schemas/activity')
const { parseImg } = require('../../../../Schemas/query')
const asyncHandler = require('express-async-handler')
const sendmail = require('../../../../middleware/mail')

/**
 * @api {post} /handlePending 身分驗證
 * @apiName handlePending
 * @apiGroup In/auth
 * @apiDescription 身分驗證
 *
 * @apiparam {String} account lineID
 * @apiparam {Boolean} acceptUser 是否接受此用戶
 *
 * @apiSuccess (204) -
 *
 * @apiError (404) {String} description user not found
 * @apiError (500) {String} description 資料庫錯誤
 */
const manage = async (req, res, next) => {
  const { account, acceptUser } = req.body
  const pending = await Pending.findOne({ account }).catch(dbCatch)
  if (!pending) throw new ErrorHandler(404, 'user not found')
  const { email } = pending
  if (acceptUser) {
    const { username, userpsw, cellphone, img } = pending
    await Login({ username, account, userpsw, cellphone, email, img })
      .save()
      .catch(async (e) => {
        console.log('error in new login:', e.message)
        throw new ErrorHandler(500, '資料庫錯誤')
      })
  }
  await Pending.deleteMany({ account }).catch(dbCatch)

  const template = require('../mailTemplate/template_generator')
  const link = `${req.protocol}://${process.env.WEB_DOMAIN}/home`
  const htmlText = await template(link, acceptUser)
  await sendmail(email, acceptUser ? 'Clink 帳號啟動' : 'Clink 帳號啟動失敗', htmlText).catch(
    (e) => {
      console.log(e)
      throw new ErrorHandler(400, 'sendemail fail')
    },
  )

  return res.send({ email, account })
}

const valid = require('../../../../middleware/validation')
const rules = [{ filename: 'required', type: 'bool', field: 'acceptUser' }]
module.exports = [valid(rules), asyncHandler(manage)]
