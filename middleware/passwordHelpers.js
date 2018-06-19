const crypto = require('crypto')

// hashes password on signup pre save
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, 'sha512')
    .toString('hex')
  return [salt, hash].join('$')
}

// verifies password on login
function verifyPassword(password, original) {
  const originalHash = original.split('$')[1]
  const salt = original.split('$')[0]
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, 'sha512')
    .toString('hex')
  return hash === originalHash
}

// basic check of email structure
function validateEmail(email) {
  const re = /(.+)@(.+){2,}\.(.+){2,}/
  return re.test(email)
}

// basic check on password
function validatePassword(password) {
  const isEightChar = password.length >= 8
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
  const hasCapitalLowerAndDigit = re.test(password)
  return !isEightChar && !hasCapitalLowerAndDigit
}

module.exports.hashPassword = hashPassword
module.exports.verifyPassword = verifyPassword
module.exports.validateEmail = validateEmail
module.exports.validatePassword = validatePassword
