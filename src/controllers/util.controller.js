const express = require('express')
const crypto = require('crypto')

/**
 * @type {express.RequestHandler}
 */
const md5 = (req, res, next) => {
  const value = req.query.value || req.body.value

  if (typeof value !== 'string' || value.length > 2 ** 12) {
    return res.json({ hash: null })
  }

  const hash = crypto.createHash('md5').update(value)
  res.json({ hash: hash.digest('hex') })
}

module.exports = { md5 }
