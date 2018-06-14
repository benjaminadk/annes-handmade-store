const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,

  password: String,

  avatar: String,

  jwt: {
    type: String,
    default: ''
  },

  ships: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'shipping'
  },

  bills: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'billing'
  },

  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart'
  },

  sales: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'sale'
  },

  createdOn: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('user', userSchema)
