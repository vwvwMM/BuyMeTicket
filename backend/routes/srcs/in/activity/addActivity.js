const { dbCatch } = require('../../../error')
const Activity = require('../../../Schemas/activity')
const User_visual = require('../../../Schemas/user_visual')
const { parseImg } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

const addAct = async (req, res) => {
  const account = req.session.loginAccount
  const { title, description, address, date } = req.body
  //   const img = parseImg(req.file)
  await new Activity({
    holder: account,
    title,
    description,
    address,
    date,
  })
    .save()
    .catch(dbCatch)

  res.status(201).send({ data: title })
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['title', 'description', 'address'],
    type: 'string',
  },
]
module.exports = [valid(rules), asyncHandler(addAct)]
