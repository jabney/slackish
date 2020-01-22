const logger = require('../config/logger')
const Namespace = require('../models/namespace')
const getCurrentRoom = require('./get-current-room')
const sendUserCount = require('./send-user-count')
const getUserCount = require('./get-user-count')
const gravatar = require('../lib/gravatar')
const { namespaces } = require('../services/namespaces')

const debug = logger('io')

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
  const currentRoom = getCurrentRoom(socket)
  socket.leave(currentRoom)
  sendUserCount(io, ns.endpoint, currentRoom)
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
    socket.leave(currentRoom)
    socket.emit('leave-room')
    sendUserCount(io, ns.endpoint, currentRoom)
  }

  socket.join(roomTitle)
  sendUserCount(io, ns.endpoint, roomTitle)
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
 * @param {Socket} socket
 * @param {Namespace} ns
 * @param {import('../../declarations').IUserMessage} msg
 */
function onMessage(io, socket, ns, msg) {
  const { name, email, text } = msg
  const avatar = gravatar(email)
  const time = Date.now()

  /** @type {import('../../declarations').IChatMessage} */
  const message = { name, text, time, avatar }
  const currentRoom = getCurrentRoom(socket)
  const nsRoom = ns.findRoom(currentRoom)

  if (nsRoom) {
    ns.findRoom(currentRoom).addMessage(message)
    io.of(ns.endpoint).to(currentRoom).emit('message', message)
  }
}

/**
 * @param {Server} io
 * @param {Namespace} ns
 */
function initNamespace(io, ns) {
  io.of(ns.endpoint).on('connect', (socket) => {
    debug('namespace connection:', socket.id)
    socket.emit('rooms', ns.rooms)
    socket.on('join-room', joinRoom.bind(null, io, socket, ns))
    socket.on('message', onMessage.bind(null, io, socket, ns))
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
    debug('connect:', socket.id)
    socket.emit('namespaces', nss)
    socket.on('disconnect', () => debug('disconnect:', socket.id))
  })
}

module.exports = init
