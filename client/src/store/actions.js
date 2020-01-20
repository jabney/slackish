
/**
 * @template T
 * @typedef {import("../../../declarations").Action} Action
 */

/**
 * @typedef {import("../../../declarations").NamespaceData} Namespace
 */

/**
 * @typedef {import("../../../declarations").RoomData} Room
 */

/**
 * @typedef {import("../../../declarations").ChatMessageData} Message
 */

export const UPDATE_NAMESPACES = 'update-namespaces'
export const UPDATE_ROOMS = 'update-rooms'
export const ADD_MESSAGE = 'add-message'

/**
 * @param {Namespace[]} namespaces
 *
 * @returns {Action<Namespace[]>}
 */
export const updateNamespaces = (namespaces) => {
  return { type: UPDATE_NAMESPACES, payload: namespaces }
}

/**
 * @param {Room[]} rooms
 *
 * @returns {Action<Room[]>}
 */
export const updateRooms = (rooms) => {
  return { type: UPDATE_ROOMS, payload: rooms }
}

/**
 * @param {Message} message
 *
 * @returns {Action<Message>}
 */
export const addMessage = (message) => {
  return { type: ADD_MESSAGE, payload: message }
}
