const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const verifyJWT = require('../verifyJWt')
const mongooSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})
const Mongoose = new mongoose.model('Mongoose', mongooSchema)

router.get('/', (req, res) => {
    Mongoose.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.get('/:id', (req, res) => {
    Mongoose.findOne({ "_id": req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.post('/',verifyJWT, (req, res) => {
    const newData = Mongoose(req.body)
    newData.save((err , data)=>{
        if (err) {
            res.status(500).send({message : "Server Side Problem"})
        }
        else{
            res.status(200).send(data)
        }
    })
})
module.exports = router 