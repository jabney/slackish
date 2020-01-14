'use strict';

(() => {
  const socket = io(location.href)
  const socketWiki = io(location.href + 'wiki')

  // Listen for namespaces from the server.
  socket.on('namespaces', (namespaces) => {
    const nsElement = dom.empty('#namespaces')
    /**
     * Create a function that maps namespace data to dom elements and
     * adds a click event listener to each one.
     */
    const nsToElement = ioHelpers.nsToElement.bind(null, (element, ns) => {
      element.addEventListener('click', () => {
        console.log('clicked namespace', ns.endpoint)
      })
    })

    // Append namespaces to the namespace dom element.
    dom.append(nsElement, namespaces.map(nsToElement))
  })

  // Listen for namespace rooms from the server.
  socketWiki.on('rooms', (rooms) => {
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

  /**
   * @type {HTMLInputElement}
   */
  const input = document.querySelector('input#user-message')
  const messages = document.querySelector('#messages')

  /**
   * @param {string} msg
   */
  function postMessage(msg) {
    const text = document.createTextNode(msg)
    const message = document.createElement('li')
    message.appendChild(text)
    messages.appendChild(message)
  }

  /**
   * @param {string} name
   * @param {string} msg
   */
  function postMsgToChannel(name, msg) {
    const message = document.createElement('li')
    const channel = document.createElement('span')
    channel.setAttribute('class', 'channel')
    channel.appendChild(document.createTextNode(name))
    message.appendChild(channel)
    message.appendChild(document.createTextNode(msg))
    messages.appendChild(message)
  }

  document.querySelector('#user-input').addEventListener('submit', (event) => {
    event.preventDefault()
    const msg = input.value
    if (msg.length > 0) {
      input.value = ''
      socket.emit('message', msg)
    }
  })

  socket.on('message', postMessage)
})()
