const adminMiddleware = (req, res, next) => {

    if (req.userInfo.role !== 'admin') {
        return res.status(400).json({
            success: false,
            message: 'You are not an admin'
        })
    }

    next()

}

module.exports = adminMiddleware