import io from 'socket.io-client'

/**
 * @typedef {import('../../../declarations').Store} Store
 * @typedef {import('../../../declarations').INsData} Namespace
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

export const UPDATE_NAMESPACES = 'update-namespaces'
export const UPDATE_ROOMS = 'update-rooms'
export const ADD_MESSAGE = 'add-message'
export const SET_USER = 'set-user'
export const SET_NAMESPACE = 'set-namespace'
export const SELECT_ROOM = 'select-room'
export const SET_ROOM_COUNT = 'set-room-count'
export const SET_ROOM_HISTORY = 'set-room-history'

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
    const newNs = { ...ns, rooms: rooms, room: null, users: 0, socket }
    dispatch({ type: SET_NAMESPACE, payload: newNs })
  })
}

/**
 * @param {Room} room
 *
 * @returns {ThunkAction<Action<any>>}
 */
export const selectRoom = (room) => (dispatch, getState) => {
  const { namespace } = getState()
  const { socket, room: currentRoom } = namespace

  if (room.title === currentRoom) { return }

  socket.emit('join-room', room.title, () => {
    /**
     * This user-count acknowledgement assures we don't miss a
     * user count message.
     */
    socket.emit('user-count', (userCount) => {
      dispatch({ type: SET_ROOM_COUNT, payload: userCount })
    })

    socket.emit('room-history', (history) => {
      dispatch({ type: SET_ROOM_HISTORY, payload: history })
    })

    const onUserCount = (userCount) => {
      dispatch({ type: SET_ROOM_COUNT, payload: userCount })
    }
    socket.on('room-user-count', onUserCount)

    const onMessage = (msg) => {
      dispatch({ type: ADD_MESSAGE, payload: msg })
    }
    socket.on('message', onMessage)

    socket.once('leave-room', () => {
      socket.off('room-user-count', onUserCount)
      socket.off('message', onMessage)
    })

    dispatch({ type: SELECT_ROOM, payload: room.title })
  })
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
