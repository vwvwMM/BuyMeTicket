const Activity = require('../../../../Schemas/activity')
const asyncHandler = require('express-async-handler')
const User_visual = require('../../../../Schemas/user_visual')

const getPid = async (part) => {
  let p = []
  for (var pp of part) {
    const { _id } = await User_visual.findOne({ account: pp }).catch((err) => {
      console.log(err)
    })
    p.push(_id)
  }
  return p
}

module.exports = asyncHandler(async (req, res, next) => {
  const { activityID, participants } = req.body
  await getPid(participants).then(async (p) => {
    await Activity.findOneAndUpdate({ activityID }, { $push: { participants: p } })
      .then(() => res.send('add participants success'))
      .catch((err) => {
        console.log(err)
      })
  })
})
