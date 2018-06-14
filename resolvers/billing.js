module.exports = {
  Query: {
    getBillingsById: async (root, { billingIds }, { models }) => {
      var bills = []
      for (let i = 0; i < billingIds.length; i++) {
        let bill = await models.Billing.findById(billingIds[i])
        bills.push(bill)
      }
      return bills
    }
  },

  Mutation: {
    createBilling: async (root, { input }, { models }) => {
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
        zip
      } = input
      const billing = new models.Billing({
        title,
        email,
        firstName,
        lastName,
        street1,
        street2,
        city,
        state,
        zip
      })
      const savedBilling = await billing.save()
      if (userId) {
        const filter = { _id: userId }
        const update = { $push: { bills: savedBilling._id } }
        const options = { upsert: true }
        await models.User.findOneAndUpdate(filter, update, options)
      }
      return savedBilling
    }
  }
}
