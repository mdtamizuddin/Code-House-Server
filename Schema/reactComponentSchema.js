
const mongoose = require('mongoose')

const reactComponentSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "React Component"
    },
    compName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    avater: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = reactComponentSchema
