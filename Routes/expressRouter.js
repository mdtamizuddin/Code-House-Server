const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const codeSchema = require('../Schema/codeSchema')

const Express = new mongoose.model('Express', codeSchema)

router.get('/', (req, res) => {
    Express.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.get('/:id', (req, res) => {
    Express.findOne({ "_id": req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.post('/', (req, res) => {
    const newData = Express(req.body)
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