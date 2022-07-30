const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const trustSchema = mongoose.Schema({
    data: {
        type: Object,
        required: true
    }
})

const Trust = new mongoose.model('Trust', trustSchema)

router.get('/', (req, res) => {
    Trust.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.get('/:id', (req, res) => {
    Trust.findOne({ "_id": req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.post('/', (req, res) => {
    const newData = Trust(req.body)
    newData.save((err, data) => {
        if (err) {
            res.status(500).send({ message: "Server Side Problem" })
        }
        else {
            res.status(200).send(data)
        }
    })
})
module.exports = router 