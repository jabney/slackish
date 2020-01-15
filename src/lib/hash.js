const crypto = require('crypto')

/**
 * @param {string} algo
 * @param {string} str
 *
 * @return {string}
 */
function hash(algo, str) {
  const h = crypto.createHash(algo)
  h.update(str)
  return h.digest('hex')
}

/**
 *
 * @param {string} algo
 *
 * @returns {(str: string) => string}
 */
function createHash(algo) {
  return hash.bind(null, algo)
}

module.exports = {
  hash, createHash
}
