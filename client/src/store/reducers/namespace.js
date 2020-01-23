import {
  SET_NAMESPACE,
  SET_ROOM,
  SET_ROOM_COUNT,
  SET_ROOM_HISTORY,
  ADD_MESSAGE,
  UPDATE_ROOMS,
} from '../actions'

const click = new Audio('sounds/click.mp3')
click.volume = 0.25

const alarm = new Audio('sounds/alarm.mp3')
alarm.volume = 0.5

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
    case UPDATE_ROOMS: {
      return { ...state, rooms: action.payload }
    }
    case SET_ROOM: {
      return { ...state, currentRoom: action.payload }
    }
    case SET_ROOM_COUNT: {
      return { ...state, numUsers: action.payload }
    }
    case SET_ROOM_HISTORY: {
      return { ...state, history: action.payload }
    }
    case ADD_MESSAGE: {
      click.play().catch(() => {})
      return { ...state, history: [...state.history, action.payload] }
    }
    default: {
      return state
    }
  }
}

export default namespace
