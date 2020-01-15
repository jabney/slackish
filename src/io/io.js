const nss = require('../services/namespaces')
const getCurrentRoom = require('./get-current-room')
const sendUserCount = require('./send-user-count')
const namespaces = nss.namespaces()

/**
 * @typedef {import('socket.io').Server} Server
 */

/**
 * @param {Server} io
 */
function init(io) {
  /**
   * Resolves when io namespaces have been configured.
   */
  const ready = namespaces.then((namespaces) => {
    // For each namespace, listen for a connection.
    namespaces.forEach((ns) => {
      // Listen for namespace connections.
      io.of(ns.endpoint).on('connect', (socket) => {
        console.log(`${socket.id} has joined ${ns.title}`)

        // Send room data.
        socket.emit('rooms', ns.rooms)

        socket.on('disconnecting', () => {
          // console.log('disconnected')
          const currentRoom = getCurrentRoom(socket)
          // Leave current room and join new room.
          socket.leave(currentRoom)
          sendUserCount(io, ns.endpoint, currentRoom)
        })

        socket.on('join-room', (roomTitle, ackCb) => {
          const currentRoom = getCurrentRoom(socket)
          // Leave current room and join new room.
          socket.leave(currentRoom)
          sendUserCount(io, ns.endpoint, currentRoom)

          socket.join(roomTitle)
          sendUserCount(io, ns.endpoint, roomTitle)

          // Check if num users ack callback was specified.
          if (ackCb) { ackCb() }

          const roomObj = ns.findRoom(roomTitle)
          if (roomObj) {
            socket.emit('history', roomObj.history)
          }
        })

        socket.on('message', ({ text }) => {
          const message = {
            text,
            time: Date.now(),
            user: 'jabney',
            avatar: 'https://s.gravatar.com/avatar/5240df899ccf11b1771b8737afada026?s=40',
          }

          const currentRoom = getCurrentRoom(socket)
          ns.findRoom(currentRoom).addMessage(message)
          io.of(ns.endpoint).to(currentRoom).emit('message', message)
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
}

module.exports = init
