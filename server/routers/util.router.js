const express = require('express')
const router = express.Router()

const { getMd5 } = require('../controllers/util.controller')

router.route('/md5')
  .get(getMd5)

module.exports = router
