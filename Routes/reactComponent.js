const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const reactComponentSchema = require('../Schema/reactComponentSchema')
const verifyJWT = require('../verifyJWt')
const ReactComponent = new mongoose.model('ReactComponent', reactComponentSchema)


router.get('/', (req, res) => {
    ReactComponent.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            const comp = data.reverse()
            res.status(200).json(comp)
        }
    })
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    ReactComponent.findOne({ '_id': id }, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.post('/', verifyJWT, async (req, res) => {
    const newComponent = new ReactComponent(req.body)
    newComponent.save((err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: "Data Inserted" })
        }
    })
})

router.delete('/:id', verifyJWT, async (req, res) => {
    const id = req.params.id
    ReactComponent.deleteOne({ '_id': id }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: 'Component Deleted Success' })
        }
    })
})


module.exports = router