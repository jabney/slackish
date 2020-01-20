import { combineReducers } from 'redux'
import namespaces from './namespaces'
import rooms from './rooms'
import messages from './messages'

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
})

export default root
