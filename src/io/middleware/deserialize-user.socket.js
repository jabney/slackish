/**
 * Parse a message packet and add a message info object.
 *
 * @param {import('socket.io').Packet} packet
 * @param {(error?: any) => void} next
 */
const deserializeUser = (packet, next) => {
  const [type, arg1] = packet

  if (type === 'message') {
    if (!arg1 || !arg1.headers || !arg1.body) {
      const msg = '<messageInfo> message format not recognized'
      console.error(msg)
      return next(new Error(msg))
    }

    const token = Buffer.from(arg1.headers.token, 'base64')
    const { user: name, email } = JSON.parse(token.toString())

    if (!name || !email) {
      const msg = '<messageInfo> invalid token'
      console.error(msg)
      return next(new Error(msg))
    }

    arg1.user = { name, email }
  }

  next()
}

module.exports = deserializeUser
