const { dbCatch, ErrorHandler } = require('../../../error')
const Login = require('../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /isLogin isLogin
 * @apiName IsLogin
 * @apiGroup Out/account
 * @apiDescription 檢查是否有登入
 *
 * @apiSuccess (201) {String} account 登入者lineID
 *
 * @apiError (403) {String} description "未登入"
 */
module.exports = asyncHandler(async (req, res, next) => {
  const session_account = req.session.loginAccount
  if (session_account) {
    const user = await Login.findOne(
      { account: session_account },
      'isAuth img cellphone username email',
    ).catch(dbCatch)
    if (!user) throw new ErrorHandler(404, 'profile不存在')
    return res.status(200).send({
      account: session_account,
      userimage: user.imgSrc,
      userCellphone: user.cellphone,
      userName: user.username,
      userEmail: user.email,
      isAuth: user.isAuth,
    })
  } else throw new ErrorHandler(403, '未登入')
})
