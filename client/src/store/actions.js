import io from 'socket.io-client'

/**
 * @typedef {import('../../../declarations').Store} Store
 * @typedef {import('../../../declarations').INsData} NsData
 * @typedef {import('../../../declarations').INamespace} Namespace
 * @typedef {import('../../../declarations').IRoom} Room
 * @typedef {import('../../../declarations').IChatMessage} ChatMessage
 * @typedef {import('../../../declarations').IUserMessage} UserMessage
 * @typedef {import('../../../declarations').IUser} User
 * @typedef {SocketIOClient.Socket} Socket
 */

/**
 * @template T
 * @typedef {import('../../../declarations').Action} Action
 */

/**
 * @template A
 * @typedef {import('redux-thunk').ThunkAction<void, Store, void, A>} ThunkAction
 */

// Client actions.
export const UPDATE_NAMESPACES = 'update-namespaces'
export const SET_USER = 'set-user'
export const SET_NAMESPACE = 'set-namespace'

// Server actions.
export const UPDATE_ROOMS = 'update-rooms'
export const ADD_MESSAGE = 'add-message'
export const SET_ROOM = 'set-room'
export const SET_ROOM_COUNT = 'set-room-count'
export const SET_ROOM_HISTORY = 'set-room-history'

/**
 * @param {NsData[]} namespaces
 *
 * @returns {Action<NsData[]>}
 */
export const updateNamespaces = (namespaces) => {
  return { type: UPDATE_NAMESPACES, payload: namespaces }
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
 * @param {NsData} ns
 *
 * @returns {ThunkAction<Action<NsData>>}
 */
export const selectNamespace = (ns) => (dispatch, getState) => {
  const { namespace: currentNs } = getState()

  if (currentNs) {
    if (currentNs.endpoint === ns.endpoint) { return }
    currentNs.socket.disconnect()
  }

  const socket = io('/' + ns.endpoint)

  socket.on('actions', (actions) => {
    actions.forEach(dispatch)
  })

  /**
   * Create a new namespace object.
   *
   * @type {Namespace}
   */
  const namespace = {
    ...ns,
    rooms: [],
    currentRoom: null,
    users: 0,
    history: [],
    socket,
  }

  dispatch({ type: SET_NAMESPACE, payload: namespace })
}

/**
 * @param {Room} room
 *
 * @returns {ThunkAction<Action<any>>}
 */
export const selectRoom = (room) => (dispatch, getState) => {
  const { namespace } = getState()
  const { socket, currentRoom } = namespace

  if (room.title === currentRoom) { return }

  socket.emit('join-room', room.title)
}

/**
 * @param {UserMessage} msg
 *
 * @returns {ThunkAction<Action<UserMessage>>}
 */
export const sendMessage = (msg) => (dispatch, getState) => {
  const { namespace } = getState()
  if (!namespace) { return }
  namespace.socket.emit('message', msg)
}
