const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const codeSchema = require('../Schema/codeSchema')
const verifyJWT = require('../verifyJWt')

const Redux = new mongoose.model('Redux', codeSchema)

router.get('/', (req, res) => {
    Redux.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.get('/:id', (req, res) => {
    Redux.findOne({ "_id": req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.post('/',verifyJWT, (req, res) => {
    const newData = Redux(req.body)
    newData.save((err , data)=>{
        if (err) {
            res.status(500).send({message : "Server Side Problem"})
        }
        else{
            res.status(200).send(data)
        }
    })
})

router.delete('/:id',verifyJWT,  async (req, res) => {
    const id = req.params.id
    Redux.deleteOne({ '_id': id }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: 'Component Deleted Success' })
        }
    })
})
module.exports = router 