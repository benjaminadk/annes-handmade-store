const mongoose = require('mongoose')
const { hashPassword } = require('../middleware/passwordHelpers')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },

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

userSchema.pre('save', function(next) {
  if (this.jwt === '') {
    this.password = hashPassword(this.password)
  }
  next()
})

mongoose.model('user', userSchema)
