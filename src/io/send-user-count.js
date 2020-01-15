
/**
 * Send user count for a room to all sockets in the room.
 *
 * @param {import('socket.io').Server} io
 * @param {string} endpoint
 * @param {string} roomTitle
 */
function sendUserCount(io, endpoint, roomTitle) {
  io.of(endpoint).in(roomTitle).clients((error, clients) => {
    if (error) {
      return console.error(error)
    }
    io.of(endpoint).in(roomTitle).emit('num-users', clients.length)
  })
}

module.exports = sendUserCount
