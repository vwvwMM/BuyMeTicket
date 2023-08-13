const { dbCatch } = require('../../../../error')
const Login = require('../../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /manageAuth 新增或刪除管理員
 * @apiName manageAuth
 * @apiGroup In/auth
 * @apiDescription 新增、刪除管理員
 *
 * @apiparam {String} account lineID
 * @apiparam {Boolean} setAuth true:加成管理員；false:從管理員移除(可以移除自己)
 *
 * @apiSuccess (204) -
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const manage = async (req, res, next) => {
  const { account, setAuth } = req.body
  await Login.updateOne({ account }, { isAuth: setAuth }).catch(dbCatch)
  res.end()
}

const valid = require('../../../../middleware/validation')
const rules = [{ filename: 'required', field: 'setAuth', type: 'bool' }]
module.exports = [valid(rules), asyncHandler(manage)]
