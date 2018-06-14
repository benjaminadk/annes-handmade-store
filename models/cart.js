const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'product'
  },

  quantity: {
    type: [Number],
    default: []
  },

  createdOn: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('cart', cartSchema)
