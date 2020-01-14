const socketio = require('socket.io')
const app = require('./app')
const initIo = require('./io')

const server = app()
const io = socketio(server)

initIo(io)
