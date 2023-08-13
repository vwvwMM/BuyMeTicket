const Visual = require('../../../Schemas/user_visual')
const { searchQuery } = require('../../../Schemas/query')
const { dbCatch } = require('../../../error')
const asyncHandler = require('express-async-handler')
const { findWithLimit } = require('../../../Schemas/query')

/**
 * @api {post} /searchProfile search profile by fields
 * @apiName SearchProfile
 * @apiGroup In/profile_new
 * @apiDescription 給定欄位搜尋porfile(OR)
 *
 * @apiparam {String} account lineID(用'x'進行模糊搜尋, ex.'b079010xx')
 * @apiparam {String} username 名字
 * @apiparam {String} nickname 綽號
 * @apiparam {String} profile 自介
 * @apiparam {String} publicEmail 公開信相
 * @apiparam {String} cellphone 手機
 * @apiparam {String} CC city and country
 * @apiparam {String} web 個人部落格
 * @apiparam {String} facebook facebook
 * @apiparam {String} Linkedin Linkedin
 * @apiparam {String} github github
 * @apiparam {Object} major 主修
 * @apiparam {String} double_major 雙主修
 * @apiparam {String} minor 輔修
 * @apiparam {String} master 碩士
 * @apiparam {String} doctor 博士
 * @apiparam {Object} Occupation 工作(這裡是obj不是array喔，會用and搜尋)(COP3個中也可以只填1個或2個)
 * @apiparam {String} Occupation.C 公司
 * @apiparam {String} Occupation.O 部門
 * @apiparam {String} Occupation.P 職位
 * @apiparam {Number} page default 1
 * @apiparam {Number} perpage default 50
 *
 * @apiSuccess (201) {String} userimage 大頭貼(使用<code>\<img src={userimage}/></code>)
 * @apiSuccess (201) {String} account lineID
 * @apiSuccess (201) {String} username 名字
 * @apiSuccess (201) {String} profile 自介
 * @apiSuccess (201) {String} publicEmail 公開信相
 * @apiSuccess (201) {String} cellphone 手機
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const srhProfile = async function (req, res, next) {
  const { account, username, profile, publicEmail, cellphone } = req.body
  const query = {
    account,
    username,
    profile,
    publicEmail,
    cellphone,
  }
  const sq = searchQuery(query)
  const { page, perpage } = req.body
  const [pros, maxPage] = await findWithLimit(Visual, sq, page, perpage || 50) //Visual.find(sq).catch(dbCatch)
  return res.status(201).send(pros.map((p) => p.getPublic()))
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['username', 'profile', 'publicEmail', 'cellphone'],
    type: 'string',
  },
]
module.exports = [valid(rules), asyncHandler(srhProfile)]
