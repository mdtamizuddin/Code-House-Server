const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const codeSchema = require('../Schema/codeSchema')
const verifyJWT = require('../verifyJWt')

const Mongodb = new mongoose.model('Mongodb', codeSchema)

router.get('/', (req, res) => {
    Mongodb.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.get('/:id', (req, res) => {
    Mongodb.findOne({ "_id": req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.post('/',verifyJWT, (req, res) => {
    const newData = Mongodb(req.body)
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
    Mongodb.deleteOne({ '_id': id }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: 'Component Deleted Success' })
        }
    })
})
module.exports = router 