const express = require('express')
const router = express.Router()

const { registerUser, loginUser, changePassword } = require('../controllers/auth-controller.js')
const authMiddleware = require('../middleware/auth-middleware.js')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/change', authMiddleware, changePassword)

module.exports = router

