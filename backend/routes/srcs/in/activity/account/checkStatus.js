const Visual = require('../../../../Schemas/user_visual')
const Activity = require('../../../../Schemas/activity')
const asyncHandler = require('express-async-handler')

const checkStatus = async (req, res, next) => {
  const { activityID, account } = req.query
  const activity = await Activity.findOne({ _id: activityID }).catch((err) => {
    console.log(err)
  })
  if (activity.holder === account) {
    res.send('holder')
    return
  }
  const visual = await Visual.findOne({ activityID, account }).catch((err) => {
    console.log(err)
  })
  if (visual) {
    res.send(visual.pending ? 'pending' : 'participants')
  } else {
    res.send('not registered')
  }
}

module.exports = asyncHandler(checkStatus)
