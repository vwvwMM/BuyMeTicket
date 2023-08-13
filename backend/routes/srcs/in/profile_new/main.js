const express = require('express')
const router = express.Router()
const parseFile = require('../../../middleware/fileProcess')

router.get('/profile', require('./getProfile'))
router.post('/profile', require('./updateProfile'))
router.post('/addProfile', require('./addProfile'))
router.post('/searchProfile', require('./searchProfile'))
router.post('/smartsearchProfile', require('./smartSearch'))

module.exports = router
