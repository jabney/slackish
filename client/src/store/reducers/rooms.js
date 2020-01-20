import {} from '../actions'

/**
 * @typedef {import('../../../../declarations').RoomData} Room
 */

/**
 * @typedef {import('../actions').Action<Room[]>} Action
 */

/**
 * @param {Room[]} state
 * @param {Action} action
 */
const rooms = (state = [], action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export default rooms
