const { dbCatch, ErrorHandler } = require('../../../../error')
const Visual = require('../../../../Schemas/user_visual')
const Activity = require('../../../../Schemas/activity')
const asyncHandler = require('express-async-handler')
const sendmail = require('../../../../middleware/mail')

const manage = async (req, res, next) => {
  const { _id: vid, acceptUser } = req.body
  const v = await Visual.findOne({ _id: vid }).catch(dbCatch)
  const activity = await Activity.findOne({ _id: v.activityID }).catch(dbCatch)
  const template = require('../mailTemplate/template_generator')
  const link = `${req.protocol}://${process.env.WEB_DOMAIN}/activities/${v.activityID}`
  const htmlText = await template(link, acceptUser)
  await sendmail(
    v.email,
    acceptUser ? `成功加入${activity.title}` : `申請加入${activity.title}失敗`,
    htmlText,
  ).catch((e) => {
    console.log(e)
    throw new ErrorHandler(400, 'sendemail fail')
  })
  if (acceptUser) {
    v.pending = false
    await v.save().catch(dbCatch)
  } else {
    await v.remove().catch(dbCatch)
  }
  res.send('manage success')
}

module.exports = asyncHandler(manage)
