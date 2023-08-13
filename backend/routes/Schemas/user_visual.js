const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Profile_Schema = new Schema({
  account: { type: String, required: true },
  activityID: { type: Schema.Types.ObjectId, ref: 'Activity' },
  title: { type: String, required: true },
  pending: { type: Boolean, default: true },
  username: { type: String, required: true },
  form: { type: Object }, //registration form
  userimage: {
    data: Buffer,
    contentType: String,
  },
  email: { type: String },
})
const { buf2url } = require('./query')
Profile_Schema.virtual('imgSrc').get(buf2url('userimage'))

Profile_Schema.statics.smartQuery = function (keywords) {
  if (!keywords) return []
  const reg = new RegExp(keywords.replace(' ', '|'), 'i')
  //   console.log(reg)
  const query = {
    $or: [{ account: reg }, { username: reg }, { profile: reg }, { activity: reg }],
  }
  return query
}

Profile_Schema.methods.getPublic = function () {
  const { _id, username, profile, account, publicEmail, cellphone, imgSrc } = this
  return {
    username,
    profile,
    userimage: imgSrc,
  }
}

module.exports = mongoose.model('User_visual', Profile_Schema)
