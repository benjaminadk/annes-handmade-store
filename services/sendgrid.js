const sgMail = require('@sendgrid/mail')
const _ = require('lodash')
const KEYS = require('../config')

sgMail.setApiKey(KEYS.SENDGRID_API_KEY)
sgMail.setSubstitutionWrappers('{{', '}}')

module.exports = (email, total) => {
  const msg = {
    to: email,
    from: 'shopping@gmail.com',
    subject: "Anne's Handmade - Purchase",
    templateId: 'e4ada337-e250-4c93-87c6-7feabf0bf0b9',
    substitutions: {
      total
    }
  }
  sgMail.send(msg)
}
