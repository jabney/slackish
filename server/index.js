const socketio = require('socket.io')
const app = require('./app')
const initIo = require('./io')

// Create the app and hand it to socketio. This is our io server.
const server = app()
const io = socketio(server)

// Initiate io and wait for connections.
initIo(io)
