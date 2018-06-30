const mail = require('../services/sendgrid')
//const sms = require('../services/twilio')
const _ = require('lodash')
const keys = require('../config')
var stripe = require('stripe')(keys.STRIPE_SECRET_LIVE)

module.exports = {
  Query: {},

  Mutation: {
    createSale: async (root, { input }, { models }) => {
      const {
        token,
        user,
        products,
        quantity,
        billingAddressId,
        shippingAddressId,
        addressMatch,
        total,
        email
      } = input

      try {
        //attempt to create charge object with stripe
        const charge = await stripe.charges.create({
          amount: parseInt(total * 100),
          currency: 'usd',
          source: token,
          description: "Anne's Handmade"
        })

        const status = charge.outcome.network_status
        //if charge is approved execute this code
        if (status === 'approved_by_network') {
          // isolate product ids for database and titles and price for email
          var productsArray = JSON.parse(products)
          var productIds = []
          var productsForEmail = []
          productsArray.forEach(p => {
            productIds.push(p.id)
            productsForEmail.push(_.pick(p, ['title', 'price']))
          })

          //create a new sale record in database
          let sale = new models.Sale({
            stripeId: charge.id,
            user,
            products: productIds,
            quantity,
            total,
            billingAddress: billingAddressId,
            shippingAddress: shippingAddressId,
            addressMatch
          })
          let savedSale = await sale.save()

          //update user to add sale
          if (user) {
            const filter = { _id: user }
            const update = { $push: { sales: savedSale._id } }
            const options = { upsert: true }
            await models.User.findOneAndUpdate(filter, update, options)
          }
          //update the products stock in database
          productIds.forEach(async (p, i) => {
            await models.Product.update(
              { _id: p },
              { $inc: { stock: `-${quantity[i]}` } }
            )
          })

          //send email to customer
          mail(email, total)

          //send sms message to Anne alerting her of sale
          //free trial limit usage for now
          //sms(total)

          //return payload to the frontend
          return {
            success: true,
            type: null,
            code: null,
            message: 'Successful Transaction',
            sale: savedSale
          }
        }

        //if charge request fails
        else if (
          status === 'not_sent_to_network' ||
          status === 'declined_by_network'
        ) {
          return {
            success: false,
            type: null,
            code: null,
            message: charge.outcome.reason,
            sale: null
          }
        }
      } catch (error) {
        console.log(error)
        return {
          success: false,
          type: error.raw.type || 'no-type',
          code: error.raw.decline_code || error.raw.code,
          message: error.raw.message || 'internal error',
          sale: null
        }
      }
    }
  }
}
