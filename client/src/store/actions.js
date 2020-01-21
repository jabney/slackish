import io from 'socket.io-client'

/**
 * @typedef {import('../../../declarations').Store} Store
 */

/**
 * @template T
 * @typedef {import('../../../declarations').Action} Action
 */

/**
 * @typedef {import('../../../declarations').INsData} Namespace
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

/**
 * @template A
 * @typedef {import('redux-thunk').ThunkAction<void, Store, void, A>} ThunkAction
 */

export const UPDATE_NAMESPACES = 'update-namespaces'
export const UPDATE_ROOMS = 'update-rooms'
export const ADD_MESSAGE = 'add-message'
export const SET_USER = 'set-user'
export const SET_NAMESPACE = 'set-namespace'

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
 * @param {Namespace} ns
 *
 * @returns {ThunkAction<Action<Namespace>>}
 */
export const selectNamespace = (ns) => (dispatch, getState) => {
  const { namespace } = getState()

  if (namespace) {
    if (namespace.endpoint === ns.endpoint) { return }
    namespace.socket.disconnect()
  }

  const socket = io('/' + ns.endpoint)

  socket.once('rooms', (rooms) => {
    const newNs = { ...ns, rooms: rooms, room: null, socket }
    dispatch({ type: SET_NAMESPACE, payload: newNs })
  })
}
