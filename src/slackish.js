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
      socket.emit('rooms', ns.rooms)
    })
  })
})

io.on('connect', async (socket) => {
  await ready
  console.log('connected:', socket.id)

  // Create namespace data for sending to the client.
  const nsData = (await namespaces).map((ns) => ({
    title: ns.title,
    img: ns.img,
    endpoint: ns.endpoint,
  }))

  // Send namespace data to newly-connected client.
  socket.emit('namespaces', nsData)

  socket.on('message', (msg) => io.emit('message', msg))

  socket.on('disconnect', () => console.log('disconnected:', socket.id))
})
