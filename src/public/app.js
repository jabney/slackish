'use strict';

(() => {
  /**
   * @typedef {import('../../declarations').NsData} NsData
   */

  /**
   * Construct a message to send over io.
   *
   * @param {string} text
   */
  function constructMessage(text) {
    const token = localStorage.getItem('token')
    const message = {
      headers: { token },
      body: { text }
    }
    return message
  }

  /**
   * @type {HTMLInputElement}
   */
  const input = document.querySelector('input#user-message')
  const form = dom.findOne('#user-input')
  /**
   * @type {HTMLInputElement}
   */
  const search = (dom.findOne('#search-box'))

  // Set an ad-hoc token object in local storage.
  localStorage.setItem('token', btoa(JSON.stringify({
    user: 'jabney',
    email: 'james.abney@gmail.com',
  })))

  // Initialize socket.io.
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
    if (input.value.length > 0) {
      ioHelpers.getNsSocket().emit('message', constructMessage(input.value))
      input.value = ''
    }
  })

  // Listen for changes to the search text.
  search.addEventListener('input', (event) => {
    const searchText = search.value.toLocaleLowerCase()
    /**
     * @type {HTMLElement[]}
     */
    const messages = (Array.from(dom.findAll('#messages li')))

    messages.forEach((li) => {
      const messageText = dom.findOne('.message-text', li).innerHTML

      if (messageText.toLocaleLowerCase().includes(searchText)) {
        li.style.display = 'block'
      } else {
        li.style.display = 'none'
      }
    })
  })
})()
