
/**
 * @template T
 * @typedef {import('../../../declarations').Action} Action
 */

/**
 * @typedef {import('../../../declarations').INamespace} Namespace
 */

/**
 * @typedef {import('../../../declarations').IRoom} Room
 */

/**
 * @typedef {import('../../../declarations').IChatMessage} Message
 */

/**
 * @typedef {import('../../../declarations').IUser} User
 */

/**
 * @typedef {SocketIOClient.Socket} Socket
 */

export const UPDATE_NAMESPACES = 'update-namespaces'
export const UPDATE_ROOMS = 'update-rooms'
export const ADD_MESSAGE = 'add-message'
export const SET_USER = 'set-user'
export const SET_SOCKET = 'set-socket'

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

/**
 * @param {User} user
 *
 * @returns {Action<User>}
 */
export const setUser = (user) => {
  return { type: SET_USER, payload: user }
}

/**
 * @param {Socket} socket
 *
 * @returns {Action<User>}
 */
export const setSocket = (socket) => {
  return { type: SET_SOCKET, payload: socket }
}
