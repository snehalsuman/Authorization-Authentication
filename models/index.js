const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    }, password: {
        type: String,
        required: true,
    }, role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }, createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('users', UserSchema)