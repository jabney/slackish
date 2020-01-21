import { combineReducers } from 'redux'
import namespaces from './namespaces'
import messages from './messages'
import user from './user'
import socket from './socket'

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
  messages,
  user,
  socket,
})

export default root
