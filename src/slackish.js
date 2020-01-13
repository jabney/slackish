const express = require('express')
const socketio = require('socket.io')
const configureApp = require('./config/app')
const nss = require('./services/namespaces')

const PORT = process.env.PORT || 9000

const app = configureApp(express())
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`))
const io = socketio(server)

const namespaces = nss.namespaces()

/**
 * Resolves when io namespaces have been configured.
 */
const ready = namespaces.then((namespaces) => {
  namespaces.forEach((ns) => {
    io.of(ns.endpoint).on('connect', (socket) => {
      console.log(`${socket.id} has joined ${ns.title}`)
    })
  })
})

io.on('connect', async (socket) => {
  await ready
  console.log('connected:', socket.id)

  // Send namespace data to newly connected client.
  const nsData = (await namespaces).map(({ img, endpoint }) => ({ img, endpoint }))
  socket.emit('namespaces', nsData)

  socket.on('message', (msg) => io.emit('message', msg))

  socket.on('disconnect', () => console.log('disconnected:', socket.id))
})
