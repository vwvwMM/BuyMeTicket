const { dbCatch, ErrorHandler } = require('../../../../error')
const Pending = require('../../../../Schemas/user_pending')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /showPending 查看待核可帳號
 * @apiName showPending
 * @apiGroup In/auth
 * @apiDescription 查看待核可帳號
 *
 * @apiparam {x} x x
 *
 * @apiSuccess (200) {Object[]} pendings 各個帳號
 * @apiSuccess (200) {String} pendings.username 名字
 * @apiSuccess (200) {String} pendings.account lineID
 * @apiSuccess (200) {String} pendings.email 信箱
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const manage = async (req, res, next) => {
  const pendings = await Pending.find({}, 'username account email cellphone img').catch(dbCatch)
  const pend = pendings.map(({ username, account, email, cellphone, imgSrc }) => {
    return { username, account, email, cellphone, imgSrc }
  })
  return res.send({ pendings: pend })
}

module.exports = asyncHandler(manage)
