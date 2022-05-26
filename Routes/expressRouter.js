const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Express = new mongoose.model('Express')

router.get('/' ,verifyJWT  ,async (req, res) => {
    Express.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
module.exports = router 