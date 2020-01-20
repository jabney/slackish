/**
 * @typedef {Object} RoomData
 * @property {string} title
 * @property {boolean} isPrivate
 */

/**
 * @typedef {Object} NamespaceData
 * @property {string} id
 * @property {string} title
 * @property {string} img
 * @property {RoomData[]} rooms
 */

const Namespace = require('../models/namespace')
const Room = require('../models/room')
const nsData = require('../data/namespaces.json')

/**
 * Fetch and transform namespaces.
 *
 * @returns {Promise<Namespace[]>}
 */
async function namespaces() {
  return nsData.namespaces.map((nsData) => {
    const ns = new Namespace(nsData.title, nsData.img, nsData.id)
    nsData.rooms.forEach(rm => ns.addRoom(new Room(rm.title, ns, rm.isPrivate)))
    return ns
  })
}

module.exports = {
  namespaces
}
