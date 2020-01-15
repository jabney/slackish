const { createHash } = require('./hash')

const md5 = createHash('md5')

/**
 * @param {string} email
 * @param {number} [size]
 */
function gravatar(email, size=40) {
  const hash = md5(email)
  return `https://s.gravatar.com/avatar/${hash}?s=${size}`
}

module.exports = gravatar
