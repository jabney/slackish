const Namespace = require('./namespace')

/**
 * @typedef {import('../../declarations').IUserInfo} IUserInfo
 */

let nextId = 0

class Room {
  /**
   * @param {string} title
   * @param {Namespace} namespace
   * @param {boolean} isPrivate
   */
  constructor(title, namespace, isPrivate = false) {
    this.id = nextId++
    this.title = title
    this.namespace = namespace
    this.isPrivate = isPrivate
    this.history = []
  }

  /**
   * Add a message to the history.
   * @param {any} msg
   */
  addMessage(msg) {
    this.history.push(msg)
    return this
  }

  /**
   * Clear the message history.
   */
  clearHistory() {
    this.history = []
    return this
  }

  /**
   * Serialization.
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      isPrivate: this.isPrivate,
      nsTitle: this.namespace.title,
    }
  }
}

module.exports = Room
