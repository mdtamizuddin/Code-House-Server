const mongoose = require('mongoose')

const reactSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        default : "am-public",
    },
    name: {
        type: String,
        required: true,
    },
    photoURL: {
        type: String,
        required: true,
    },
    date : {
        type : Date,
        default : Date.now,
    }
})

module.exports = reactSchema
