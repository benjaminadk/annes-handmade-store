//const bcrypt = require('bcrypt-nodejs')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk')
const KEYS = require('../config')
const saltRounds = 10

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'us-west-1',
  accessKeyId: KEYS.ACCESS_KEY_ID,
  secretAccessKey: KEYS.SECRET_ACCESS_KEY
})

module.exports = {
  Query: {
    getUserById: async (root, { userId }, { models }) => {
      const user = await models.User.findById(userId)
        .populate([
          { path: 'ships', model: 'shipping' },
          { path: 'bills', model: 'billing' },
          { path: 'cart', model: 'cart' },
          {
            path: 'sales',
            model: 'sale',
            populate: [
              { path: 'products', model: 'product' },
              { path: 'shippingAddress', model: 'shipping' }
            ]
          }
        ])
        .exec()
      return user
    }
  },

  Mutation: {
    signup: async (root, { username, password }, { models }) => {
      const cart = new models.Cart()
      const savedCart = await cart.save()
      const user = new models.User({
        username,
        password,
        ships: [],
        bills: [],
        cart: savedCart._id
      })
      const savedUser = await user.save()
      const token = await jwt.sign(
        {
          id: savedUser._id,
          cartId: savedCart._id
        },
        KEYS.JWT_SECRET,
        { expiresIn: '7d' }
      )
      savedUser.jwt = token
      const reSavedUser = await savedUser.save()
      const populatedUser = await models.User.findById(reSavedUser._id)
        .populate({ path: 'cart', model: 'cart' })
        .exec()
      return {
        success: true,
        message: 'user created successfully',
        user: populatedUser
      }
    },

    login: async (root, { username, password }, { models }) => {
      const user = await models.User.findOne({ username })
      if (!user) {
        return {
          success: false,
          message: 'invalid email address',
          user: null
        }
      }

      const match = password === user.password
      if (match) {
        const token = await jwt.sign(
          {
            id: user._id,
            cartId: user.cart
          },
          KEYS.JWT_SECRET,
          { expiresIn: '7d' }
        )
        user.jwt = token
        const reSavedUser = await user.save()
        const populatedUser = await models.User.findById(reSavedUser._id)
          .populate([
            { path: 'ships', model: 'shipping' },
            { path: 'bills', model: 'billing' },
            { path: 'cart', model: 'cart' }
          ])
          .exec()
        return {
          success: true,
          message: 'user logged in successfully',
          user: populatedUser
        }
      } else {
        return {
          success: false,
          message: 'invalid password',
          user: null
        }
      }
    },

    autoLogin: async (root, { userId }, { models }) => {
      const user = await models.User.findById(userId)
        .populate([
          { path: 'ships', model: 'shipping' },
          { path: 'bills', model: 'billing' },
          { path: 'cart', model: 'cart' }
        ])
        .exec()
      if (user) {
        return {
          success: true,
          message: 'user logged in successfully',
          user
        }
      } else {
        return {
          success: false,
          message: 'bad token',
          user: null
        }
      }
    },

    s3Sign: async (root, { filename, filetype }, context) => {
      const s3Params = {
        Bucket: 'shopping-site',
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read'
      }
      const requestUrl = await s3.getSignedUrl('putObject', s3Params)
      const imageUrl = `https://shopping-site.s3.amazonaws.com/${filename}`
      return { requestUrl, imageUrl }
    },

    setAvatar: async (root, { userId, avatar }, { models }) => {
      try {
        const filter = { _id: userId }
        const update = { $set: { avatar } }
        const options = { upsert: true }
        await models.User.findOneAndUpdate(filter, update, options)
        return {
          success: true,
          message: 'User avatar set',
          user: null
        }
      } catch (error) {
        return {
          success: false,
          message: 'Error: Setting avatar failure',
          user: null
        }
      }
    }
  }
}
