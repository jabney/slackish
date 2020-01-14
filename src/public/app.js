'use strict';

(() => {
  /**
   * @typedef {import('../../declarations').NsData} NsData
   */

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

  /**
   * @param {NsData[]} namespaces
   */
  function onNamespaces(namespaces) {
    syncData = { ...syncData, namespaces: true }
    ioHelpers.onNamespaces(namespaces)
  }

  socket.on('connect', () => {
    // Request data based on sync state.
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
