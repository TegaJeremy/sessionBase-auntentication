const express = require('express')
const router = express.Router();
const recordcontroller = require('../controller/recordController')
const authmiddleware = require('../middleware/authmiddleware')


router.post('/records', authmiddleware.isLoggedIn, recordcontroller.createRecord)
router.get('/records', authmiddleware.isLoggedIn, recordcontroller.readAllRecordsOfSpecificUser)
router.get('/allrecords', authmiddleware.isLoggedIn, recordcontroller.readAllRecords)
router.get('/readrecords/:id', authmiddleware.isLoggedIn, recordcontroller.readrecord)



module.exports = router


