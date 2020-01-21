import { SET_NAMESPACE } from '../actions'

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
    default: {
      return state
    }
  }
}

export default namespace
