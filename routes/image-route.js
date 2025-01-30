const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/auth-middleware.js')
const adminMiddleware = require('../middleware/admin-middleware.js')

const {uploadImage , getImage, deleteImage }= require('../controllers/image-controller.js')
const uploadMiddleware = require('../middleware/upload-middleware.js')

router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single("image"), uploadImage)
router.get('/get',authMiddleware,getImage)
router.delete('/delete/:id',authMiddleware,adminMiddleware,deleteImage)

module.exports = router