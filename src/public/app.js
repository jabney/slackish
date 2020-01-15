'use strict';

(() => {
  /**
   * @typedef {import('../../declarations').NsData} NsData
   */

  /**
   * @type {HTMLInputElement}
   */
  const input = document.querySelector('input#user-message')
  const form = dom.findOne('#user-input')

  // Initialize socket,io.
  const socket = io(location.href)

  // Keep track of the first connection vs subsequent reconnects.
  let syncData = {
    namespaces: false,
  }

  /**
   * Handler for incomming namespaces; update sync data when called.
   *
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

  // Listen for form submit events.
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const text = input.value
    if (text.length > 0) {
      input.value = ''
      ioHelpers.getNsSocket().emit('message', { text })
    }
  })
})()
