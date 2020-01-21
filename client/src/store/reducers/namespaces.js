import { UPDATE_NAMESPACES } from '../actions'

/**
 * @typedef {import('../../../../declarations').INsData} Namespace
 */

/**
 * @typedef {import('../../../../declarations').Action<Namespace[]>} Action
 */

/**
 * @param {Namespace[]} state
 * @param {Action} action
 */
const namespaces = (state = [], action) => {
  switch (action.type) {
    case UPDATE_NAMESPACES: {
      return action.payload
    }
    default: {
      return state
    }
  }
}

export default namespaces
