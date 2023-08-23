const express = require('express')
const {  tempRegister , verifyOtp } = require('./tempController')
const router = express.Router()

router.post('/register' , tempRegister)
router.post('/verifyOtp' , verifyOtp)

module.exports = router