import { combineReducers } from 'redux'
import namespaces from './namespaces'
import rooms from './rooms'
import messages from './messages'
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
  namespaces,
  rooms,
  messages,
  user,
})

export default root
