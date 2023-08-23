const express = require('express')
const { getUser, register, loginUser } = require('./userController')
const router = express.Router()

router.get('/get' , getUser)
router.post('/register' , register)
router.post('/login' , loginUser)

// router.post('/me', protect, getMe)

module.exports = router