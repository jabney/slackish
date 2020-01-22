const logger = require('../config/logger')
const Namespace = require('../models/namespace')
const getCurrentRoom = require('./get-current-room')
const sendUserCount = require('./send-user-count')
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
 * Disconnect from an IO namespace.
 *
 * @param {Server} io
 * @param {Socket} socket
 * @param {Namespace} ns
 */
function disconnecting(io, socket, ns) {
  const currentRoom = getCurrentRoom(socket)
  socket.leave(currentRoom)
  sendUserCount(io, ns.endpoint, currentRoom)
}

/**
 * Handle chat message construction and delivery.
 *
 * @param {Server} io
 * @param {Socket} socket
 * @param {Namespace} ns
 * @param {import('../../declarations').IUserMessage} msg
 */
function onMessage(io, socket, ns, msg) {
  const { name, email, text } = msg

  /**
   * Construct the message object.
   *
   * @type {import('../../declarations').IChatMessage}
   */
  const message = {
    name,
    text,
    time: Date.now(),
    avatar: gravatar(email)
  }

  // Get the current room title and object.
  const currentRoomTitle = getCurrentRoom(socket)
  const room = ns.findRoom(currentRoomTitle)

  // Add the message to the room's message history.
  room.addMessage(message)

  // Send the message to all clients in the current room.
  const action = { type: 'add-message', payload: message }
  io.of(ns.endpoint).to(currentRoomTitle).emit('actions', [action])
}

/**
 * Handle a join room request from the client.
 *
 * @param {Server} io
 * @param {Socket} socket
 * @param {Namespace} ns
 * @param {string} roomTitle
 */
function joinRoom(io, socket, ns, roomTitle) {
  const currentRoomTitle = getCurrentRoom(socket)

  // If the user is in a room, leave the room and notify other clients.
  if (currentRoomTitle) {
    socket.leave(currentRoomTitle)
    sendUserCount(io, ns.endpoint, currentRoomTitle)
  }

  // Join the room and notify all clients of the new room count.
  socket.join(roomTitle)
  sendUserCount(io, ns.endpoint, roomTitle)

  // Get the namespace room object.
  const room = ns.findRoom(roomTitle) || { history: [] }

  // Update the client.
  socket.emit('actions', [
    { type: 'set-room', payload: roomTitle },
    { type: 'set-room-history', payload: room.history },
  ])
}

/**
 * Initialize a namespace to receive connections.
 *
 * @param {Server} io
 * @param {Namespace} ns
 */
function initNamespace(io, ns) {
  io.of(ns.endpoint).on('connect', (socket) => {
    debug('namespace connect:', socket.id)
    // Send current ns room data to the client.
    socket.emit('actions', [{ type: 'update-rooms', payload: ns.rooms }])
    // Listen for client join room requests.
    socket.on('join-room', joinRoom.bind(null, io, socket, ns))
    // Listen for client chat message events.
    socket.on('message', onMessage.bind(null, io, socket, ns))
    // Perform cleanup actions on socket disconnect.
    socket.on('disconnecting', disconnecting.bind(null, io, socket, ns))
    socket.on('disconnect', () => debug('namespace disconnect:', socket.id))
  })
}

/**
 * Initialize IO.
 *
 * @param {SocketIO.Server} io
 */
async function init(io) {
  const nss = await namespaces()
  nss.forEach(ns => initNamespace(io, ns))

  io.on('connect', (socket) => {
    debug('connect:', socket.id)
    // Send namespace data to the client.
    socket.emit('namespaces', nss)
    // Monitor for socket disconnect.
    socket.on('disconnect', () => debug('disconnect:', socket.id))
  })
}

module.exports = init
