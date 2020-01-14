const express = require('express')
const path = require('path')

const utilRouter = require('./routers/util.router')

const PORT = process.env.PORT || 9000

/**
 * Create and configure the express app. Start and return the server.
 */
function expressApp() {
  const app = express()
  app.use(express.static(path.resolve(__dirname, './public')))
  const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`))
  return server
}

module.exports = expressApp
