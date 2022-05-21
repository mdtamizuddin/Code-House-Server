const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required : true
    },
    name: {
        type: String,
        required: true,
    },
    date : {
        type : Date,
        default : Date.now,
    }
})

module.exports = feedbackSchema
