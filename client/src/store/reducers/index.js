import { combineReducers } from 'redux'
import namespaces from './namespaces'
import namespace from './namespace'
import user from './user'

/**
 * @template T
 * @typedef {import('../actions').Action<T>} Action
 */

/**
 * @typedef {Object} State
 * @property {any} user
 */

const root = combineReducers({
  user,
  namespaces,
  namespace,
})

export default root
