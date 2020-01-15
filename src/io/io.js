const nss = require('../services/namespaces')
const getCurrentRoom = require('../lib/get-current-room')

const namespaces = nss.namespaces()

/**
 * @typedef {import('socket.io').Server} Server
 */

/**
 * Send user count for a room to all sockets in the room.
 *
 * @param {Server} io
 * @param {string} endpoint
 * @param {string} roomTitle
 */
function sendUserCount(io, endpoint, roomTitle) {
  const roomNs = io.of(endpoint).in(roomTitle)
  roomNs.clients((error, clients) => {
    if (error) {
      return console.error(error)
    }
    roomNs.emit('num-users', clients.length)
  })
}

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
        // Join room on request.

        socket.on('disconnecting', () => {
          // console.log('disconnected')
          const currentRoom = getCurrentRoom(socket)
          // Leave current room and join new room.
          socket.leave(currentRoom)
          sendUserCount(io, ns.endpoint, currentRoom)
        })

        socket.on('join-room', (roomTitle, numUsersCb) => {
          const currentRoom = getCurrentRoom(socket)
          // Leave current room and join new room.
          socket.leave(currentRoom)
          sendUserCount(io, ns.endpoint, currentRoom)

          socket.join(roomTitle)
          sendUserCount(io, ns.endpoint, roomTitle)

          // Check if num users ack callback was specified.
          if (numUsersCb) {
            numUsersCb()
          }

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
          const roomNs = io.of(socket.nsp.name).to(currentRoom)
          ns.findRoom(currentRoom).addMessage(message)
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
}

module.exports = init
