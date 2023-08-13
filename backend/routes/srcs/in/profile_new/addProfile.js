const Visual = require('../../../Schemas/user_visual')
const Login = require('../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')
const { parseImg } = require('../../../Schemas/query')
const { dbCatch } = require('../../../error')

const AddProfile = async (req, res, next) => {
  const { data } = req.body
  const exist = await Visual.find({
    $and: [{ account: data.account }, { activityID: data.activityID }],
  }).catch(dbCatch)
  console.log('exist=', exist)
  if (exist.length === 0) {
    if (!data['userimage']) {
      const u = await Login.findOne({ account: data.account }, 'img').catch(dbCatch)
      data['userimage'] = u.img
    }
    await new Visual(data).save().catch(dbCatch)
    res.send('add profile')
  } else {
    console.log('profile exist')
    res.send('profile exist')
  }
}

module.exports = asyncHandler(AddProfile)
