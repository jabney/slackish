import {
  SET_NAMESPACE,
  SELECT_ROOM,
  SET_ROOM_COUNT,
  SET_ROOM_HISTORY,
} from '../actions'

/**
 * @typedef {import('../../../../declarations').INamespace} Namespace
 */

/**
 * @typedef {import('../../../../declarations').Action<Namespace>} Action
 */

/**
 * @param {Namespace} state
 * @param {Action} action
 */
const namespace = (state = null, action) => {
  switch (action.type) {
    case SET_NAMESPACE: {
      return action.payload
    }
    case SELECT_ROOM: {
      return { ...state, room: action.payload }
    }
    case SET_ROOM_COUNT: {
      return { ...state, users: action.payload }
    }
    case SET_ROOM_HISTORY: {
      return { ...state, history: action.payload }
    }
    default: {
      return state
    }
  }
}

export default namespace
