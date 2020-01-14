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
   * @param {SocketIOClient.Socket} nsSocket
   * @param {string} roomTitle
   */
  function joinRoom(nsSocket, roomTitle) {
    nsSocket.emit('join-room', roomTitle, (error, numUsers) => {
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
  }

  /**
   * Handle namespace rooms list from server.
   *
   * @param {SocketIOClient.Socket} nsSocket
   * @param {RoomData[]} rooms
   */
  function onRooms(nsSocket, rooms) {
    const roomElement = dom.empty('#room-list')

    // Keep track of which room the user is in.
    let currentRoom = null

    /**
     * Create a function that maps namespace data to dom elements and
     * adds a click event listener to each one.
     *
     * @type {(room: RoomData) => Element}
     */
    const roomToElement = domHelpers.roomToElement.bind(null, (element, room) => {
      element.addEventListener('click', () => {
        if (currentRoom !== room.title) {
          joinRoom(nsSocket, room.title)
          currentRoom = room.title
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
    const nsSocket = io(location.href + endpoint)

    // Listen for namespace rooms from the server.
    nsSocket.on('rooms', onRooms.bind(null, nsSocket))

    return nsSocket
  }

  /**
   * Handle namespaces list from server.
   *
   * @param {NsData[]} namespaces
   */
  function onNamespaces(namespaces) {
    // Connect to the first namespace in the list.
    const initialEndpoint = namespaces[0].endpoint
    let nsSocket = joinNamespace(initialEndpoint)

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
          nsSocket.disconnect()
          nsSocket = joinNamespace(ns.endpoint)
        }
      })
    })

    // Append namespaces to the namespaces element.
    dom.append(nsElement, namespaces.map(nsToElement))
  }

  /**
   * @type {IoHelpers}
   */
  const ioHelpers = {
    onNamespaces,
  }

  window.ioHelpers = ioHelpers
})()
