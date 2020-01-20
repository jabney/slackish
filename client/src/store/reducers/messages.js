import {} from '../actions'

/**
 * @typedef {import('../../../../declarations').ChatMessageData} Message
 */

/**
 * @typedef {import('../actions').Action<Message>} Action
 */

/**
 * @param {Message[]} state
 * @param {Action} action
 */
const messages = (state = [], action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export default messages
