const getUserCount = require('./get-user-count')

/**
 * Send user count for a room to all sockets in the room.
 *
 * @param {import('socket.io').Server} io
 * @param {string} endpoint
 * @param {string} roomTitle
 */
function sendUserCount(io, endpoint, roomTitle) {
  getUserCount(io, endpoint, roomTitle, (userCount) => {
    io.of(endpoint).in(roomTitle).emit('room-user-count', userCount)
  })
}

module.exports = sendUserCount
