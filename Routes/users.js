const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userSchema = require('../Schema/userSchema')
require('dotenv').config()
const verifyJWT = require('../verifyJWt')
const jwt = require('jsonwebtoken')
const User = new mongoose.model('User', userSchema)

router.get('/',verifyJWT, (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            const comp = data.reverse()
            res.status(200).json(comp)
        }
    })
})

router.get('/:email', async (req, res) => {
    const email = req.params.email
    User.findOne({ email: email }, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.put('/admin/:email', verifyJWT, async (req, res) => {
    const email = req.params.email
    console.log(newUser)
    User.updateOne({ email: email }, {
        $set: {
            role: "admin"
        }
    }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: "Data was Updated" })
        }
    })
})
router.put('/:email', async (req, res) => {
    const email = req.params.email
    const newUser = new User(req.body)
    User.findOne({ email: email }, (err, data) => {
        if (data) {
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN)
            res.status(200).send({ message: "Data Alrady Available", token })
        }
        else {
            newUser.save((err) => {
                if (err) {
                    res.status(500).json({ error: "Server Side Error" })
                }
                else {
                    const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN)
                    res.status(200).json({ message: "Data Inserted", token })
                }
            })
        }
    })
})
router.post('/', verifyJWT, async (req, res) => {
    const newUser = new User(req.body)
    newUser.save((err, data) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: "Data Inserted" })
        }
    })
})
router.delete('/:email', verifyJWT, async (req, res) => {
    const email = req.params.email
    User.deleteOne({ email: email }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: 'User Deleted Success' })
        }
    })
})

module.exports = router