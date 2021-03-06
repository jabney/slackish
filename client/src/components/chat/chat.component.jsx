import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { sendMessage } from 'store/actions'
import { ReactComponent as UserIcon } from 'bootstrap-icons/icons/person-fill.svg'
import ChatMessage from 'components/chat-message'

import './chat.component.scss'

/**
 * Chat panel component.
 */
const Chat = ({ user, namespace, sendMessage }) => {
  const [value, setValue] = useState('')
  const msgList = useRef(null)

  useEffect(() => {
    const { current } = msgList

    // Scroll to the bottom of the message list.
    if (current != null) {
      current.scrollTo(0, current.scrollHeight)
    }
  }, [namespace])

  /**
   * Send a message.
   *
   * @param {React.FormEvent} e
   */
  const onSubmit = (e) => {
    e.preventDefault()
    // Don't send zero-length messages.
    if (value.length === 0) { return }
    // Clear the input box.
    setValue('')

    // Dispatch chat message to the server.
    sendMessage({
      name: user.name,
      email: user.email,
      text: value,
    })
  }

  /**
   * Return a unique key for the given message.
   *
   * @param {import('../../../../declarations').IChatMessage} m
   */
  const messageKey = (m) => `${m.name}:${m.time}`

  if (!namespace) {
    return null
  }

  return <div className="Chat">
    <div className="header">
      {
        typeof namespace.currentRoom === 'string' ? (
          <>
            <h2>#{namespace.currentRoom}</h2>
            <span className='users'>
              <UserIcon className='icon' />
              {namespace.numUsers}
            </span>
          </>
        ) : (
          <p>Select a room to begin chatting</p>
        )
      }
    </div>
    <div className="body">
      <ul className="messages" ref={msgList}>
        {
          namespace.history.map(msg => <ChatMessage key={messageKey(msg)} msg={msg} />)
        }
      </ul>
    </div>
    <div className="footer">
      <form onSubmit={onSubmit} >
        <input type="text" placeholder="Enter chat text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={typeof namespace.currentRoom !== 'string'}
        />
        <input type="submit" />
      </form>
    </div>
  </div>
}

const mapState = (state) => ({
  user: state.user,
  namespace: state.namespace,
})

const mapDispatch = (dispatch) => ({
  sendMessage: (msg) => dispatch(sendMessage(msg))
})

export default connect(mapState, mapDispatch)(Chat)
