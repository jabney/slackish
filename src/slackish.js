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
  // For each namespace, listen for a connection.
  namespaces.forEach((ns) => {
    // Listen for namespace connections.
    io.of(ns.endpoint).on('connect', (socket) => {
      console.log(`${socket.id} has joined ${ns.title}`)

      // Track the socket's current room.
      let currentRoom = null

      // Send room data.
      socket.emit('rooms', ns.rooms)
      // Join room on request.
      socket.on('join-room', (roomTitle, numUsersCb) => {
        // Leave current room and join new room.
        socket.leave(currentRoom)
        currentRoom = roomTitle
        socket.join(roomTitle)

        // Check if num users ack callback was specified.
        if (numUsersCb) {
          const roomNs = io.of(ns.endpoint).in(roomTitle)
          roomNs.clients((error, clients) => {
            numUsersCb(error, clients.length)
          })
        }
      })

      socket.on('message', ({ text }) => {
        const message = {
          text,
          time: Date.now(),
          user: 'jabney',
          avatar: 'https://s.gravatar.com/avatar/5240df899ccf11b1771b8737afada026?s=40',
        }

        const [, currRoom] = Object.keys(socket.rooms)
        const roomNs = io.of(socket.nsp.name).to(currRoom)
        roomNs.emit('message', message)
      })
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

  // On sync request, send requested data.
  socket.on('sync', ({ namespaces }) => {
    if (!namespaces) {
      // Send namespace data to newly-connected client.
      socket.emit('namespaces', nsData)
    }
  })

  // Log disconnects.
  socket.on('disconnect', () => console.log('disconnected:', socket.id))
})
