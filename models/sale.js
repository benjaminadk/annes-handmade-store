const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
  stripeId: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'product'
  },

  quantity: [Number],

  total: Number,

  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'billing'
  },

  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shipping'
  },

  addressMatch: Boolean,

  shipped: {
    type: Boolean,
    default: false
  },

  createdOn: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('sale', saleSchema)
