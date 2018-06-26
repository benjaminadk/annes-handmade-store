const twilio = require('twilio')
const keys = require('../config')

module.exports = total => {
  const client = new twilio(keys.TWILIO_SID, keys.TWILIO_AUTH)
  client.messages
    .create({
      body: `NEW SALE: $ ${total}`,
      to: '+15187917043',
      from: '+15182820342'
    })
    .then(message => console.log(`Message ${message.sid} sent to Anne`))
}
