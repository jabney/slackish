import React, { useState } from 'react'
import { connect } from 'react-redux'
import { sendMessage } from '../../store/actions'
import { ReactComponent as UserIcon } from 'bootstrap-icons/icons/person-fill.svg'
import ChatMessage from '../chat-message/chat-message.component'

import './chat.component.scss'

/**
 * Chat panel component.
 */
const Chat = ({ user, namespace, sendMessage }) => {
  const [value, setValue] = useState('')

  /**
   * @param {React.FormEvent} e
   */
  const onSubmit = (e) => {
    e.preventDefault()
    if (value.length === 0) { return }
    setValue('')

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

  if (!namespace || !namespace.currentRoom) {
    return null
  }

  return <div className="Chat">
    <div className="header">
      <h2>#{namespace.currentRoom}</h2>
      <span className='users'>
        <UserIcon className='icon' />
        {namespace.users}
      </span>
    </div>
    <div className="body">
      <ul className="messages">
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
