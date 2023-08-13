const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const activity_Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  holder: { type: String, required: true }, //lineID of holder
  // form: { type: Object, required: true }, //registration form
})

module.exports = mongoose.model('Activity', activity_Schema)
