const mongoose = require('mongoose')
const env = require('dotenv')
env.config()

// const localDB = 'mongodb://localhost:27017/clink'
let DB_URL
if (process.env.MONGO_URI) {
  DB_URL = process.env.MONGO_URI
} else {
  console.log('using sample DBurl, contact project manager to get real DBurl')
  DB_URL =
    'mongodb://vwvwMM:093755t@ac-8czofmv-shard-00-00.gji1mtm.mongodb.net:27017,ac-8czofmv-shard-00-01.gji1mtm.mongodb.net:27017,ac-8czofmv-shard-00-02.gji1mtm.mongodb.net:27017/?ssl=true&replicaSet=atlas-ltm0t5-shard-0&authSource=admin&retryWrites=true&w=majority'
}
console.log('mongoose connecting to：', DB_URL)

const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
mongoose.connect(DB_URL, options)
mongoose.connection.on('disconnected', function () {
  console.log('disconnected to', DB_URL)
})
mongoose.connection.on('error', function (err) {
  console.log(err.message)
})

module.exports = mongoose
