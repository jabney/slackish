import {} from '../actions'

/**
 * @typedef {import('../../../../declarations').NamespaceData} Namespace
 */

/**
 * @typedef {import('../actions').Action<Namespace[]>} Action
 */

/**
 * @param {Namespace[]} state
 * @param {Action} action
 */
const namespaces = (state = [], action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export default namespaces
