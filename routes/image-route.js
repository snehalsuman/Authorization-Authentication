const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/auth-middleware.js')
const adminMiddleware = require('../middleware/admin-middleware.js')

const {uploadImage , getImage }= require('../controllers/image-controller.js')
const uploadMiddleware = require('../middleware/upload-middleware.js')

router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single("image"), uploadImage)
router.get('/get',authMiddleware,getImage)

module.exports = router