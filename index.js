const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000
app.use(bodyParser.json())
app.use(cors())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rffqm.mongodb.net/code-house?retryWrites=true&w=majority`;

mongoose.connect(uri , {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => console.log('Database Is Connected'))
.catch((err)=> console.log(err))


app.use('/users' , require('./Routes/users'))
app.use('/feedback' , require('./Routes/feedbackRoute'))
app.use('/reactComponent' , require('./Routes/reactComponent'))
app.use('/express' , require('./Routes/expressRouter'))
app.use('/mongodb' , require('./Routes/mongodbRouter'))
app.use('/mongoose' , require('./Routes/MongooseRouter'))
app.use('/react' , require('./Routes/reactRouter'))
app.use('/next' , require('./Routes/nextRouter'))

app.get('/' , (req , res) =>{
    res.send({message : "Server Is Running"})
})

app.listen(PORT, () => {
    console.log('Example app listening')
}) 
