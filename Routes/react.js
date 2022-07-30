const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const verifyJWT = require('../verifyJWt')


const mongoose = require('mongoose')

const reactComponentSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "React Component"
    },
    compName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    css: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    avater: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})


const ReactComp = new mongoose.model('ReactOnly', reactComponentSchema)


router.get('/', (req, res) => {
    ReactComp.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    ReactComp.findOne({ '_id': id }, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.post('/', verifyJWT, async (req, res) => {
    const newComponent = new ReactComp(req.body)
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
    ReactComp.deleteOne({ '_id': id }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: 'Component Deleted Success' })
        }
    })
})


module.exports = router