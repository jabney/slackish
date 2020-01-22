import { SET_USER } from '../actions'

/**
 * @typedef {import('../../../../declarations').IUser} User
 */

/**
 * @typedef {import('../../../../declarations').Action<User>} Action
 */

/**
 * @param {User} state
 * @param {Action} action
 */
const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.payload
    }
    default: {
      return state
    }
  }
}

export default user
