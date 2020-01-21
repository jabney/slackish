const { namespaces } = require('../services/namespaces')
const Namespace = require('../models/namespace')
const getCurrentRoom = require('./get-current-room')
const sendUserCount = require('./send-user-count')
const getUserCount = require('./get-user-count')

/**
 * @typedef {import('socket.io').Server} Server
 */

/**
 * @typedef {import('socket.io').Socket} Socket
 */

/**
 *
 * @param {Server} io
 * @param {Socket} socket
 * @param {Namespace} ns
 */
function disconnect(io, socket, ns) {
  console.log('disconnected:', socket.id)
}

/**
 * @param {Server} io
 * @param {Socket} socket
 * @param {Namespace} ns
 * @param {string} roomTitle
 */
function joinRoom(io, socket, ns, roomTitle, onJoin) {
  const currentRoom = getCurrentRoom(socket)

  if (currentRoom) {
    socket.emit('leave-room')
    socket.leave(currentRoom)
    sendUserCount(io, ns.endpoint, currentRoom)
  }

  socket.join(roomTitle)
  onJoin()

  socket.once('user-count', (userCountCb) => {
    getUserCount(io, ns.endpoint, roomTitle, userCountCb)
  })

  socket.once('room-history', (historyCb) => {
    const room = ns.findRoom(roomTitle)
    if (room) {
      historyCb(room.history)
    } else {
      historyCb([])
    }
  })

  sendUserCount(io, ns.endpoint, roomTitle)
}

/**
 * @param {Server} io
 * @param {Namespace} ns
 */
function initNamespace(io, ns) {
  io.of(ns.endpoint).on('connect', (socket) => {
    console.log('namespace connection:', socket.id)
    socket.emit('rooms', ns.rooms)
    socket.on('join-room', joinRoom.bind(null, io, socket, ns))
    socket.on('disconnect', disconnect.bind(null, io, socket, ns))
  })
}

/**
 *
 * @param {SocketIO.Server} io
 */
async function init(io) {
  const nss = await namespaces()
  nss.forEach(ns => initNamespace(io, ns))

  io.on('connect', (socket) => {
    console.log('connect:', socket.id)
    socket.emit('namespaces', nss)
    socket.on('disconnect', () => console.log('disconnect:', socket.id))
  })
}

module.exports = init
