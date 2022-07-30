const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const codeSchema = require('../Schema/codeSchema')
const verifyJWT = require('../verifyJWt')

const Next = new mongoose.model('Next', codeSchema)

router.get('/', (req, res) => {
    Next.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.get('/:id', (req, res) => {
    Next.findOne({ "_id": req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.post('/',verifyJWT, (req, res) => {
    const newData = Next(req.body)
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