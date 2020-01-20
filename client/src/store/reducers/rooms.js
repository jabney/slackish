import { UPDATE_ROOMS } from '../actions'

/**
 * @typedef {import('../../../../declarations').RoomData} Room
 */

/**
 * @typedef {import('../../../../declarations').Action<Room[]>} Action
 */

/**
 * @param {Room[]} state
 * @param {Action} action
 */
const rooms = (state = [], action) => {
  switch (action.type) {
    case UPDATE_ROOMS: {
      return action.payload
    }
    default: {
      return state
    }
  }
}

export default rooms
