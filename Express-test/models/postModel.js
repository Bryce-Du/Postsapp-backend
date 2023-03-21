const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    edited: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)