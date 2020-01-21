const { namespaces } = require('../services/namespaces')
const Namespace = require('../models/namespace')

/**
 * @typedef {import('socket.io').Server} Server
 */

/**
 * @typedef {import('socket.io').Socket} Socket
 */

/**
 * @param {Server} io
 * @param {Namespace} ns
 */
function initNamespace(io, ns) {
  io.of(ns.endpoint).on('connect', (nsSocket) => {
    console.log('namespace connection:', nsSocket.id)
    nsSocket.emit('rooms', ns.rooms)
    nsSocket.on('disconnect', () => console.log('disconnect:', nsSocket.id))
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
