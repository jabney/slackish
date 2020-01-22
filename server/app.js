const express = require('express')
const path = require('path')

const utilRouter = require('./routers/util.router')

const PORT = process.env.PORT || 3001

/**
 * Create and configure the express app. Start and return the server.
 */
function expressApp() {
  const app = express()
  app.use(express.static('./client/build'))
  app.use(express.json())
  app.use('/util', utilRouter)
  const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`))
  return server
}

module.exports = expressApp
