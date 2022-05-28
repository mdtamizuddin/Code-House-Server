const mongoose = require('mongoose')

const reactSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  code:{
    type: String,
    required: true,
  }

})

module.exports = reactSchema
