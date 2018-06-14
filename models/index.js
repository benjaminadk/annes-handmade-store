const mongoose = require('mongoose')
const User = mongoose.model('user')
const Product = mongoose.model('product')
const Cart = mongoose.model('cart')
const Shipping = mongoose.model('shipping')
const Billing = mongoose.model('billing')
const Sale = mongoose.model('sale')

module.exports = {
  User,
  Product,
  Cart,
  Shipping,
  Billing,
  Sale
}
