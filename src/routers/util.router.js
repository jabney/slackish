const express = require('express')
const router = express.Router()

const { md5 } = require('../controllers/util.controller')

router.route('/md5')
  .get(md5)

module.exports = router
