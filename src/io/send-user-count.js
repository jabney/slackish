
/**
 * Send user count for a room to all sockets in the room.
 *
 * @param {import('socket.io').Server} io
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

module.exports = sendUserCount
