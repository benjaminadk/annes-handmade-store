module.exports = {
  Query: {
    getShippingsById: async (root, { shippingIds }, { models }) => {
      var ships = []
      for (let i = 0; i < shippingIds.length; i++) {
        let ship = await models.Shipping.findById(shippingIds[i])
        ships.push(ship)
      }
      return ships
    }
  },

  Mutation: {
    createShipping: async (root, { input }, { models }) => {
      const {
        userId,
        title,
        email,
        firstName,
        lastName,
        street1,
        street2,
        city,
        state,
        zip,
        notes
      } = input
      const shipping = new models.Shipping({
        title,
        email,
        firstName,
        lastName,
        street1,
        street2,
        city,
        state,
        zip,
        notes
      })
      const savedShipping = await shipping.save()
      if (userId) {
        const filter = { _id: userId }
        const update = { $push: { ships: savedShipping._id } }
        const options = { upsert: true }
        await models.User.findOneAndUpdate(filter, update, options)
      }
      return savedShipping
    }
  }
}
