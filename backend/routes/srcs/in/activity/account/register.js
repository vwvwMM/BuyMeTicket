const Visual = require('../../../../Schemas/user_visual')
const asyncHandler = require('express-async-handler')

const register = async (req, res, next) => {
  const { data } = req.body
  const visual = await new Visual({ ...data }).save().catch((err) => {
    console.log(err)
  })
  res.send('register success')
}

module.exports = asyncHandler(register)
