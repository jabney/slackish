const express = require('express')
const { createHash } = require('../lib/hash')

const md5 = createHash('md5')

/**
 * @type {express.RequestHandler}
 */
const getMd5 = (req, res, next) => {
  const value = req.query.value || req.body.value

  if (typeof value !== 'string' || value.length > 2 ** 12) {
    return res.json({ hash: null })
  }

  res.json({ hash: md5(value) })
}

module.exports = { getMd5 }
