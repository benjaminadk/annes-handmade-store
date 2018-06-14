const mongoose = require('mongoose')

const billingSchema = new mongoose.Schema({
  title: String,

  email: String,

  firstName: String,

  lastName: String,

  street1: String,

  street2: {
    type: String,
    default: ''
  },

  city: String,

  state: String,

  zip: String
})

mongoose.model('billing', billingSchema)
