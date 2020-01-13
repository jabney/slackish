const express = require('express')
const path = require('path')
/**
 *
 * @param {express.Application} app
 */
function configureApp(app) {
  app.use(express.static(path.resolve(__dirname, '../public')))

  return app
}

module.exports = configureApp
