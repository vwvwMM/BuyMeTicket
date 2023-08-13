const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const notification_Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  sender: { type: String, required: true }, //lineID of sender
  receiver: { type: String, required: true }, //lineID of receiver
})

module.exports = mongoose.model('Notification', notification_Schema)
