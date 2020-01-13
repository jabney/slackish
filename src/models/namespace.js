const Room = require('./room')

let nextId = 0

class Namespace {
  static lala = 1
  /**
   * @param {string} title
   * @param {string} img
   * @param {string} endpoint
   */
  constructor(title, img, endpoint) {
    this.id = nextId++
    this.title = title
    this.img = img
    this.endpoint = endpoint

    /**
     * @type {Room[]}
     */
    this.rooms = []
  }

  /**
   * @param {Room} room
   */
  addRoom(room) {
    this.rooms.push(room)
  }
}

module.exports = Namespace
