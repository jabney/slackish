
const reNsId = /^\/.+?#[a-z0-9]+$/i

/**
 * @param {import('socket.io').Socket} socket
 */
function getCurrentRoom(socket) {
  const roomKeys = Object.keys(socket.rooms)
  const [first, second] = roomKeys

  if (reNsId.test(first)) {
    // If the first element is a namespace id, return the second.
    return second
  }

  return first
}

module.exports = getCurrentRoom
