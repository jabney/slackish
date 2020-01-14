'use strict'

/**
 * Join the namespace indicated by the given endpoint.
 *
 * @param {string} endpoint
 */
function ioJoinNs(endpoint) {
  const nsSocket = io(location.href + endpoint)

  // Listen for namespace rooms from the server.
  nsSocket.on('rooms', (rooms) => {
    const roomElement = dom.empty('#room-list')
    /**
     * Create a function that maps namespace data to dom elements and
     * adds a click event listener to each one.
     */
    const roomToElement = ioHelpers.roomToElement.bind(null, (element, room) => {
      element.addEventListener('click', () => {
        console.log('clicked room', room.title)
      })
    })

    // Append namespaces to the namespace dom element.
    dom.append(roomElement, rooms.map(roomToElement))
  })

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

  const socket = io(location.href)

  // Listen for namespaces from the server.
  socket.on('namespaces', ioOnNamespaces)

  // Listen for message received.
  socket.on('message', (msg) => {
    const message = dom.createElement('li', {}, [msg])
    messages.appendChild(message)
  })

  document.querySelector('#user-input').addEventListener('submit', (event) => {
    event.preventDefault()
    const msg = input.value
    if (msg.length > 0) {
      input.value = ''
      socket.emit('message', msg)
    }
  })

})()
