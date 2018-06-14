module.exports = {
  Query: {
    getCartById: async (root, { cartId }, { models }) => {
      const cart = await models.Cart.findById(cartId)
        .populate({ path: 'products', model: 'product' })
        .exec()
      if (cart.products && cart.products.length > 0) {
        const taxRate = 0.0725
        var subTotal = 0
        for (let i = 0; i < cart.products.length; i++) {
          subTotal += cart.products[i].price * cart.quantity[i]
        }
        subTotal = parseFloat(subTotal.toFixed(2))
        var taxTotal = parseFloat((subTotal * taxRate).toFixed(2))
        var total = parseFloat((subTotal + taxTotal).toFixed(2))
        return {
          cart: cart,
          taxRate: taxRate,
          subTotal: subTotal,
          taxTotal: taxTotal,
          total: total
        }
      } else {
        return {
          cart: cart,
          taxRate: null,
          subTotal: null,
          taxTotal: null,
          total: null
        }
      }
    }
  },

  Mutation: {
    createCart: async (root, args, { models }) => {
      try {
        const cart = new models.Cart()
        const savedCart = await cart.save()
        return savedCart
      } catch (error) {
        console.log('createCart')
        return null
      }
    },

    addProductToCart: async (
      root,
      { cartId, productId, quantity },
      { models }
    ) => {
      const cart = await models.Cart.findById(cartId)
      if (cart.products.indexOf(productId) >= 0) {
        return {
          success: false,
          message: 'Product is already in your Cart'
        }
      }
      const filter = { _id: cartId }
      const update = { $push: { products: productId, quantity } }
      const options = { upsert: true }
      await models.Cart.findOneAndUpdate(filter, update, options)
      return {
        success: true,
        message: null
      }
    },

    removeProductFromCart: async (root, { cartId, index }, { models }) => {
      try {
        const cart = await models.Cart.findById(cartId)
        cart.products = cart.products.filter((p, i) => i !== index)
        cart.quantity = cart.quantity.filter((q, i) => i !== index)
        await cart.save()
        return {
          success: true,
          message: null
        }
      } catch (error) {
        console.log('removeProductFromCart', error)
        return {
          success: false,
          message: 'Error removing product from cart'
        }
      }
    },

    editCartQuantity: async (root, { cartId, index, quantity }, { models }) => {
      try {
        await models.Cart.update(
          { _id: cartId },
          { $set: { [`quantity.${index}`]: quantity } }
        )
        return {
          success: true,
          message: 'Cart quantity editted successfully'
        }
      } catch (error) {
        console.log('editCartQuantity', error)
        return {
          success: false,
          message: 'Error editting cart quantity'
        }
      }
    },

    emptyCart: async (root, { cartId }, { models }) => {
      try {
        const cart = await models.Cart.findOne({ _id: cartId })
        cart.products = []
        cart.quantity = []
        await cart.save()
        return {
          success: true,
          message: 'Cart emptied successfully'
        }
      } catch (error) {
        console.log('emptyCart', error)
        return {
          success: false,
          message: 'Error emptying cart'
        }
      }
    }
  }
}
