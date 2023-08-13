//srcs/chLogin.js
const { dbCatch, ErrorHandler } = require('../../../error')
const Visual = require('../../../Schemas/user_visual')
const asyncHandler = require('express-async-handler')
/**
 * @api {get} /profile show my profile
 * @apiName getProfile
 * @apiGroup In/profile_new
 * @apiDescription 顯示個人profile
 *
 * @apiSuccess (201) {String} userimage 大頭貼(使用<code>\<img src={userimage}/></code>)
 * @apiSuccess (201) {String} account lineID
 * @apiSuccess (201) {String} username 名字
 * @apiSuccess (201) {String} nickname 綽號
 * @apiSuccess (201) {String} profile 自介
 * @apiSuccess (201) {String} publicEmail 公開信相
 * @apiSuccess (201) {String} cellphone 手機
 * @apiSuccess (201) {String} CC city and country
 * @apiSuccess (201) {String} web 個人部落格
 * @apiSuccess (201) {String} facebook facebook
 * @apiSuccess (201) {String} Linkedin Linkedin
 * @apiSuccess (201) {String} major 學士
 * @apiSuccess (201) {String} double_major 雙主修
 * @apiSuccess (201) {String} minor 輔系
 * @apiSuccess (201) {String} master 碩士
 * @apiSuccess (201) {String} doctor 博士
 * @apiSuccess (201) {Object[]} Occupation 職業
 * @apiSuccess (201) {String} Occupation.C 公司
 * @apiSuccess (201) {String} Occupation.O 部門
 * @apiSuccess (201) {String} Occupation.P 職稱
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const getProfile = async (req, res, next) => {
  const { activityID, account, vid } = req.query
  let obj
  if (vid) {
    obj = await Visual.find({ _id: vid }).catch(dbCatch)
  } else if (activityID && account) {
    obj = await Visual.find({ account, activityID }).catch(dbCatch)
  } else if (account) {
    obj = await Visual.find({ account }).catch(dbCatch)
  }
  return res
    .status(201)
    .send(
      obj.map(({ form, _id, imgSrc, username, title }) => ({ form, _id, imgSrc, username, title })),
    )
}
module.exports = asyncHandler(getProfile)
