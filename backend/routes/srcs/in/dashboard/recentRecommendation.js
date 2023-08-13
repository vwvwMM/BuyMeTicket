const { dbCatch, ErrorHandler } = require('../../../error')
const Recommendation = require('../../../Schemas/recommendation')
const asyncHandler = require('express-async-handler')

/**
 * @api {get} /recommendation/recent get recent recommendation
 * @apiName RecentRecommendation
 * @apiGroup Out/recent
 * @apiDescription 搜尋簡歷
 *
 * @apiParam {Number} number 篇數(default:5)
 *
 * @apiSuccess (201) {Object[]} - 簡歷們
 * @apiSuccess (201) {String} -._id mongodb _id(for update,delete)
 * @apiSuccess (201) {Object} -.title 標題相關
 * @apiSuccess (201) {String} -.title.title 標題
 * @apiSuccess (201) {String} -.title.name 名字
 * @apiSuccess (201) {String} -.title.desire_work_type 想要職位
 * @apiSuccess (201) {Object} -.info 工作資訊
 * @apiSuccess (201) {String} -.info.contact 電話
 * @apiSuccess (201) {String[]} -.info.email 信箱
 * @apiSuccess (201) {String} -.info.diploma 學院
 * @apiSuccess (201) {Object} -.spec 詳細描述
 * @apiSuccess (201) {String[]} -.spec.experience 經驗
 * @apiSuccess (201) {String[]} -.spec.speciality 專長
 * @apiSuccess (201) {String} -.image 頭像(Ex. <code>\<img src={image}/></code>)
 *
 * @apiError (403) {String} - not login
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next) => {
  const { number } = req.query
  const limit = number ? parseInt(number) : 5
  const totalNumber = parseInt(await Recommendation.count().catch(dbCatch))
  console.log(totalNumber)
  const recs = await Recommendation.find()
    .skip(totalNumber - limit)
    .catch(dbCatch)
  return res.status(201).send({ data: recs.reverse().map((rec) => rec.getPublic()) })
})
