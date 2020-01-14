'use strict';

(() => {
  /**
   * @typedef {import('../../declarations').IoHelpers} IoHelpers
   */

  /**
   * @typedef {import('../../declarations').NsData} NsData
   */

  /**
   * @typedef {import('../../declarations').RoomData} RoomData
   */

  /**
   * @type {SocketIOClient.Socket}
   */
  let nsSocket

  /**
   * @type {string}
   */
  let nsRoomTitle

  function getNsSocket() {
    if (nsSocket == null) {
      throw new Error('getNsSocket: cannot use null socket')
    }
    return nsSocket
  }

  /**
   * @param {string} roomTitle
   */
  function joinRoom(roomTitle) {
    nsSocket.emit('join-room', roomTitle, (error, numUsers) => {
      nsRoomTitle = roomTitle
      // Set current room title.
      const currRoomElement = dom.findOne('#curr-room-text')
      currRoomElement.innerHTML = roomTitle

      // Set current room num users.
      const usersElement = dom.findOne('#curr-room-users-count')
      if (error) {
        usersElement.innerHTML = '0'
      } else {
        usersElement.innerHTML = `${numUsers}`
      }
    })

    nsSocket.on('history', (history) => {
      const messages = dom.findOne('#messages')
      history.forEach(message => domHelpers.appendMessage(messages, message))
    })
  }

  /**
   * Handle namespace rooms list from server.
   *
   * @param {RoomData[]} rooms
   */
  function onRooms(rooms) {
    const roomElement = dom.empty('#room-list')

    // Join the first room in the list.
    const [{ title: initialRoom }] = rooms
    joinRoom(initialRoom)

    /**
     * Create a function that maps namespace data to dom elements and
     * adds a click event listener to each one.
     *
     * @type {(room: RoomData) => Element}
     */
    const roomToElement = domHelpers.roomToElement.bind(null, (element, room) => {
      element.addEventListener('click', () => {
        if (nsRoomTitle !== room.title) {
          joinRoom(room.title)
          nsRoomTitle = room.title
        }
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
  function joinNamespace(endpoint) {
    if (nsSocket != null) {
      nsSocket.disconnect()
    }

    nsSocket = io(location.href + endpoint)

    // Listen for namespace rooms from the server.
    nsSocket.on('rooms', onRooms)

    return nsSocket
  }

  /**
   * Handle namespaces list from server.
   *
   * @param {NsData[]} namespaces
   */
  function onNamespaces(namespaces) {
    const messages = dom.findOne('#messages')

    // Connect to the first namespace in the list.
    const [{ endpoint }] = namespaces
    joinNamespace(endpoint)

    // Remove children of the namespaces element.
    const nsElement = dom.empty('#namespaces')

    /**
     * Create a function that maps namespace data to dom elements and
     * adds a click event listener to each one.
     */
    const nsToElement = domHelpers.nsToElement.bind(null, (element, ns) => {
      element.addEventListener('click', () => {
        // Get the current socket endpoint (remove leading slash)
        const currentEndpoint = nsSocket.nsp.slice(1)
        if (currentEndpoint !== ns.endpoint) {
          joinNamespace(ns.endpoint)
        }
      })
    })

    // Append namespaces to the namespaces element.
    dom.append(nsElement, namespaces.map(nsToElement))

    // Listen for message received.
    nsSocket.on('message', (message) => {
      domHelpers.appendMessage(messages, message)
    })
  }

  /**
   * @type {IoHelpers}
   */
  const ioHelpers = {
    onNamespaces,
    getNsSocket,
  }

  window.ioHelpers = ioHelpers
})()
