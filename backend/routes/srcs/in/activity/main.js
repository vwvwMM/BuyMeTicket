const express = require('express')
const router = express.Router()

router.get('/getActivities', require('./getActivities'))
router.get('/getActParticipants', require('./account/getParticipants'))
router.get('/checkActStatus', require('./account/checkStatus'))
router.get('/showActPending', require('./account/showActPending'))
router.post('/addActivity', require('./addActivity'))
router.post('/addParticipants', require('./account/addParticipants'))
router.post('/handleActPending', require('./account/handlePending'))
router.post('/registerActivity', require('./account/register'))
// router.delete('/deleteActivity', require('./deleteActivity'))

module.exports = { router }
