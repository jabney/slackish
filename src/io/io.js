
const nss = require('../services/namespaces')
const getCurrentRoom = require('./get-current-room')
const sendUserCount = require('./send-user-count')
const namespaces = nss.namespaces()
const Namespace = require('../models/namespace')

/**
 * @typedef {import('socket.io').Server} Server
 */

/**
 * @typedef {import('socket.io').Socket} Socket
 */

/**
 * @param {Socket} socket
 * @param {Server} io
 * @param {string} endpoint
 */
function disconnect(socket, io, endpoint) {
  // console.log('disconnected')
  const currentRoom = getCurrentRoom(socket)
  // Leave current room and join new room.
  socket.leave(currentRoom)
  sendUserCount(io, endpoint, currentRoom)
}

/**
 * @param {Socket} socket
 * @param {Server} io
 * @param {Namespace} ns
 * @param {string} roomTitle
 */
function joinRoom(socket, io, ns, roomTitle) {
  const currentRoom = getCurrentRoom(socket)
  // Leave current room and join new room.
  socket.leave(currentRoom)
  sendUserCount(io, ns.endpoint, currentRoom)

  socket.join(roomTitle)
  sendUserCount(io, ns.endpoint, roomTitle)

  const roomObj = ns.findRoom(roomTitle)
  if (roomObj) {
    socket.emit('history', roomObj.history)
  }
}

/**
 * @param {Socket} socket
 * @param {Server} io
 * @param {Namespace} ns
 * @param {string} text
 */
function onMessage(socket, io, ns, text) {
  const message = {
    text,
    time: Date.now(),
    user: 'jabney',
    avatar: 'https://s.gravatar.com/avatar/5240df899ccf11b1771b8737afada026?s=40',
  }

  const currentRoom = getCurrentRoom(socket)
  ns.findRoom(currentRoom).addMessage(message)
  io.of(ns.endpoint).to(currentRoom).emit('message', message)
}

/**
 * @param {Server} io
 * @param {Namespace} ns
 */
function initNamespace(io, ns) {
  // Listen for namespace connections.
  io.of(ns.endpoint).on('connect', (socket) => {
    console.log(`${socket.id} has joined ${ns.title}`)

    // Send room data.
    socket.emit('rooms', ns.rooms)

    socket.on('join-room', (roomTitle, ackCb) => {
      // Check if num users ack callback was specified.
      if (ackCb) { ackCb() }

      joinRoom(socket, io, ns, roomTitle)
    })

    socket.on('message', ({ text }) => onMessage(socket, io, ns, text))

    socket.on('disconnecting', () => disconnect(socket, io, ns.endpoint))
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
    namespaces.forEach(initNamespace.bind(null, io))
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
