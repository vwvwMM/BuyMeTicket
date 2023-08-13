const mongoose = require('mongoose')
const models = [
  require('./user_login'),
  require('./user_visual_new'),
  require('./recruitment'),
  require('./recommendation'),
  require('./column_detail'),
  require('./column_outline'),
  require('./time'),
  require('./matching_form').seniorForm,
  require('./matching_form').juniorForm,
  require('./activation'),
]
const env = require('dotenv')
env.config()

const sourceUrl = process.env.MONGO_URL
const targetUrl = process.env.MONGO_URI
if (!sourceUrl || !targetUrl) throw new Error('MONGO_URI or MONGO_URL not given')

const copy = async (sourceDB, targetDB, schema, name, ordered = true) => {
  const sourceModel = sourceDB.model(name, schema)
  const targetModel = targetDB.model(name, schema)
  const docs = await sourceModel.find()
  console.log(`${docs.length} ${name} docs found`)
  await targetModel.insertMany(docs, { ordered }) //ordered true may run faster(?) but will be unordered
  console.log(`insert ${name} complete`)
}

const main = async () => {
  console.log(`saving to ${targetUrl}`)
  const option = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  const sourceDB = await mongoose.createConnection(sourceUrl, option)
  const targetDB = await mongoose.createConnection(targetUrl, option)
  const dp = new Promise((resolve, reject) => {
    targetDB.db.dropDatabase(function (err, res) {
      if (err) reject(err)
      console.log('target DB drop success')
      resolve()
    })
  })
  await dp
  const tasks = models.map((model) => {
    const collectionName = model.collection.collectionName
    const Schema = model.schema
    return copy(sourceDB, targetDB, Schema, collectionName)
  })
  await Promise.all(tasks)
  sourceDB.close()
  targetDB.close()
}
main()
