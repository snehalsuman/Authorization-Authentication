const Image = require('../models/images.js')
const uploadToCloudinary = require('../helpers/cloudinaryHelpers.js')
const cloudinary = require('../config/cloudinary.js')

const uploadImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image was uploaded."
            })
        }

        const { url, publicId } = await uploadToCloudinary(req.file.path)

        const newUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newUploadedImage.save()

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            data: newUploadedImage
        })



    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: `Internal server error`
        })
    }

}

const getImage = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5

        const skip = (page - 1) * limit

        const sortBy = req.query.sortBy || "createdAt"
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1

        const totalImages = await Image.countDocuments()
        const totalPages = Math.ceil(totalImages / limit)

        const sortObj = {}
        sortObj[sortBy] = sortOrder

        const images = await Image.find({}).sort(sortObj).skip(skip).limit(limit)
        if (!images) {
            return res.status(404).json({
                success: false,
                message: `No images found`
            })
        }

        res.status(200).json({
            success: true,
            message: `Images found`,
            currentPage: page,
            totalImages: totalImages,
            totalPages: totalPages,
            data: images
        })


    } catch (error) {

        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: `Internal server error`
        })

    }

}


const deleteImage = async (req, res) => {

    try {
        const imageId = req.params.id

        const getCurrentImageDetails = await Image.findById(imageId)
        if (!getCurrentImageDetails) {
            return res.status(404).json({
                success: false,
                message: `Image not found`
            })
        }

        // delete from cloudinary
        await cloudinary.uploader.destroy(getCurrentImageDetails.publicId)

        // delete from MongoDB
        await Image.findByIdAndDelete(imageId)

        res.status(200).json({
            success: true,
            message: `Image deleted`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Internal server error`
        })
    }

}

module.exports = { uploadImage, getImage, deleteImage }