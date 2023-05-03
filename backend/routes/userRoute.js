const express = require('express')
const {loginUser,signupUser} = require('../conrollers/userController')


const router = express.Router()

//login route
router.post('/login',loginUser)

//logout route
router.post('/signup',signupUser)

module.exports = router