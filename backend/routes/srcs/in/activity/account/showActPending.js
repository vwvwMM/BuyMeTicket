const Visual = require('../../../../Schemas/user_visual')
const asyncHandler = require('express-async-handler')

const showActPending = async (req, res, next) => {
  const { activityID } = req.query
  const obj = await Visual.find({ activityID, pending: true }).catch((e) => console.log(e))
  return res
    .status(201)
    .send(obj.map(({ form, _id, imgSrc, username }) => ({ form, _id, imgSrc, username })))
}

module.exports = asyncHandler(showActPending)
