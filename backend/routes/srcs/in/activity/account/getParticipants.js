const asyncHandler = require('express-async-handler')
const Visual = require('../../../../Schemas/user_visual')
const { dbCatch } = require('../../../../error')

module.exports = asyncHandler(async (req, res, next) => {
  const { activityID } = req.query
  const v = await Visual.find({ activityID, pending: false }).catch(dbCatch)
  res.status(200).send(v.map(({ _id, imgSrc, username }) => ({ _id, imgSrc, username })))
})
