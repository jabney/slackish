// DEBUG= does not work with npm 'debug' package in this project.
require('dotenv').config()

const express = require('express')
const logger = require('./config/logger')
const utilRouter = require('./routers/util.router')

const PORT = process.env.PORT || 3001

const debug = logger('app')

/**
 * Create and configure the express app. Start and return the server.
 */
function expressApp() {
  const app = express()
  app.use(express.static('./client/build'))
  app.use(express.json())
  app.use('/util', utilRouter)
  const server = app.listen(PORT, () => debug(`listening on port ${PORT}`))
  return server
}

module.exports = expressApp
