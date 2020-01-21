import { SET_SOCKET } from '../actions'

/**
 * @typedef {SocketIOClient.Socket} Socket
 */

/**
 * @typedef {import('../../../../declarations').Action<Socket>} Action
 */

/**
 * @param {Socket} state
 * @param {Action} action
 */
const socket = (state = null, action) => {
  switch (action.type) {
    case SET_SOCKET: {
      return action.payload
    }
    default: {
      return state
    }
  }
}

export default socket
