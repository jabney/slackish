import { ADD_MESSAGE } from '../actions'

/**
 * @typedef {import('../../../../declarations').ChatMessageData} Message
 */

/**
 * @typedef {import('../../../../declarations').Action<Message>} Action
 */

/**
 * @param {Message[]} state
 * @param {Action} action
 */
const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return [...state, action.payload]
    }
    default: {
      return state
    }
  }
}

export default messages
