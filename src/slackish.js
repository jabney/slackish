const express = require('express')
const socketio = require('socket.io')

const PORT = process.env.port || 9000

const app = express()
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`))
const io = socketio(server)

const namespaces = require('./services/namespaces')()
namespaces.then(nss => console.log(nss))

io.on('connect', (socket) => {
  console.log('connected:', socket.id)
  socket.emit('welcome', 'welcome to yet another chat server')

  socket.on('message', (msg) => io.emit('message', msg))

  socket.on('disconnect', () => console.log('disconnected:', socket.id))
})

io.of('admin').on('connect', (socket) => {
  socket.emit('welcome', 'welcome to admin')
})

app.use(express.static(__dirname + '/public'))
