const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: [{
        type: String,
    }],
    mobileNumber: [{
        type: Number,
    }],
})

module.exports = mongoose.model('User', userSchema)             