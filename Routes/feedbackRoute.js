const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const feedbackSchema = require('../Schema/feedbackShema')
const verifyJWT = require('../verifyJWt')
const Feedback = new mongoose.model('Feedback', feedbackSchema)

router.get('/' ,verifyJWT  ,async (req, res) => {
    Feedback.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.post('/',verifyJWT, async (req, res) => {
    const newFeedback = new Feedback(req.body)
    newFeedback.save((err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: "Data Inserted" })
        }
    })
})
router.delete('/:id',verifyJWT, async (req, res) => {
    const id = req.params.id
    Feedback.deleteOne({ '_id' : id }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: 'User Deleted Success' })
        }
    })
})


module.exports = router