/**
 * Send user count for a room to all sockets in the room.
 *
 * @param {import('socket.io').Server} io
 * @param {string} endpoint
 * @param {string} roomTitle
 * @param {(users: number) => void} userCountCb
 */
function getUserCount(io, endpoint, roomTitle, userCountCb) {
  io.of(endpoint).in(roomTitle).clients((error, clients) => {
    if (error) {
      return console.error(error)
    }
    userCountCb(clients.length)
  })
}

module.exports = getUserCount
