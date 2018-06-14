module.exports = {
  Query: {
    getAllProducts: async (root, args, { models }) => {
      try {
        const products = await models.Product.find({})
        return products
      } catch (error) {
        console.log('getAllProducts', error)
        return null
      }
    },

    getProductById: async (root, { productId }, { models }) => {
      try {
        const product = await models.Product.findById(productId)
        return product
      } catch (error) {
        console.log('getProductById', error)
        return null
      }
    }
  },

  Mutation: {
    setRating: async (root, { productId, rate }, { models }) => {
      try {
        const filter = { _id: productId }
        const update = { $push: { ratings: rate } }
        const options = { upsert: true }
        await models.Product.findOneAndUpdate(filter, update, options)
        return {
          success: true
        }
      } catch (error) {
        console.log('setRating', error)
        return {
          success: false
        }
      }
    }
  }
}
