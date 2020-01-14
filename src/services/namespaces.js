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

const superagent = require('superagent')
const urlPrefix = require('../lib/plugins/superagent/url-prefix')
const Namespace = require('../models/namespace')
const Room = require('../models/room')

// Create an instance of superagent with url prefixing plugged in.
const agent = superagent.agent().use(urlPrefix('http://localhost:9001'))

/**
 * Fetch and transform namespaces.
 *
 * @returns {Promise<Namespace[]>}
 */
async function namespaces() {
  const response = await agent.get('namespaces')

  /**
   * @type {NamespaceData[]}
   */
  const nsData = response.body
  return nsData.map((nsData) => {
    const ns = new Namespace(nsData.title, nsData.img, nsData.id)
    nsData.rooms.forEach(rm => ns.addRoom(new Room(rm.title, ns, rm.isPrivate)))
    return ns
  })
}

module.exports = {
  namespaces
}
