const Activity = require('../../../Schemas/activity')
const asyncHandler = require('express-async-handler')

module.exports = asyncHandler(async (req, res, next) => {
  const { account, activityID } = req.query
  if (account) {
    const activities = await Activity.find({ holder: account }).catch((err) => {
      console.log(err)
    })
    res.status(200).send(activities)
  } else if (activityID) {
    const activity = await Activity.findById(activityID).catch((err) => {
      console.log(err)
    })
    res.status(200).send(activity)
  } else {
    const activities = await Activity.find({})
    res.status(200).send(activities)
  }
})
