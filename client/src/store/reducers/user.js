import { SET_USER } from '../actions'

/**
 * @typedef {import('../../../../declarations').UserData} User
 */

/**
 * @typedef {import('../../../../declarations').Action<User>} Action
 */

const defaultState = {
  name: '',
  email: '',
}
/**
 * @param {User} state
 * @param {Action} action
 */
const user = (state = defaultState, action) => {
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
