'use strict'

/**
 * @param {SocketIOClient.Socket} nsSocket
 * @param {string} roomTitle
 */
function ioJoinRoom(nsSocket, roomTitle) {
  nsSocket.emit('join-room', roomTitle)
}

/**
 * Handle namespace rooms list from server.
 *
 * @param {SocketIOClient.Socket} nsSocket
 * @param {import('../../declarations').RoomData[]} rooms
 */
function ioOnRooms(nsSocket, rooms) {
  const roomElement = dom.empty('#room-list')
  /**
   * Create a function that maps namespace data to dom elements and
   * adds a click event listener to each one.
   *
   * @type {(room: import('../../declarations').RoomData) => Element}
   */
  const roomToElement = ioHelpers.roomToElement.bind(null, (element, room) => {
    element.addEventListener('click', () => {
      ioJoinRoom(nsSocket, room.title)
    })
  })

  // Append namespaces to the namespace dom element.
  dom.append(roomElement, rooms.map(roomToElement))
}

/**
 * Join the namespace indicated by the given endpoint.
 *
 * @param {string} endpoint
 */
function ioJoinNs(endpoint) {
  const nsSocket = io(location.href + endpoint)

  // Listen for namespace rooms from the server.
  nsSocket.on('rooms', ioOnRooms.bind(null, nsSocket))

  return nsSocket
}

/**
 * Handle namespaces list from server.
 *
 * @param {import('../../declarations').NsData[]} namespaces
 */
function ioOnNamespaces(namespaces) {
  // Connect to the first namespace in the list.
  const initialEndpoint = namespaces[0].endpoint
  let nsSocket = ioJoinNs(initialEndpoint)

  // Remove children of the namespaces element.
  const nsElement = dom.empty('#namespaces')

  /**
   * Create a function that maps namespace data to dom elements and
   * adds a click event listener to each one.
   */
  const nsToElement = ioHelpers.nsToElement.bind(null, (element, ns) => {
    element.addEventListener('click', () => {
      // Get the current socket endpoint (remove leading slash)
      const currentEndpoint = nsSocket.nsp.slice(1)
      if (currentEndpoint !== ns.endpoint) {
        nsSocket.disconnect()
        nsSocket = ioJoinNs(ns.endpoint)
      }
    })
  })

  // Append namespaces to the namespaces element.
  dom.append(nsElement, namespaces.map(nsToElement))
}

(() => {
  /**
   * @type {HTMLInputElement}
   */
  const input = document.querySelector('input#user-message')
  const messages = document.querySelector('#messages')
  const form = document.querySelector('#user-input')

  // Initialize socket,io.
  const socket = io(location.href)

  // Keep track of the first connection vs subsequent reconnects.
  let syncData = {
    namespaces: false,
  }

  function onNamespaces(namespaces) {
    syncData = { ...syncData, namespaces: true }
    ioOnNamespaces(namespaces)
  }

  socket.on('connect', () => {
    socket.emit('sync', syncData)

    // Listen for namespaces from the server.
    socket.on('namespaces', onNamespaces)
  })

  // Listen for message received.
  socket.on('message', (msg) => {
    const message = dom.createElement('li', {}, [msg])
    messages.appendChild(message)
  })

  // Listen for form submit events.
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const msg = input.value
    if (msg.length > 0) {
      input.value = ''
      socket.emit('message', msg)
    }
  })

})()
