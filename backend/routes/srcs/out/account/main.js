const express = require('express')
const router = express.Router()
const parseFile = require('../../../middleware/fileProcess')

router.post('/login', require('./login'))

router.post('/register', parseFile('file'), require('./register'))

router.get('/regact/:account/:active', require('./activate'))

router.post('/logout', require('./logout'))

router.post('/isLogin', require('./isLogin'))

module.exports = router
