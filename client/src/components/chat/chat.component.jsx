import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../../store/actions'

import ChatMessage from '../chat-message/chat-message.component'

import './chat.component.scss'

/**
 * Chat panel component.
 */
const Chat = ({ user, messages, addMessage }) => {
  const [value, setValue] = useState('')

  /**
   * @param {React.FormEvent} e
   */
  const onSubmit = (e) => {
    e.preventDefault()
    if (value.length === 0) { return }
    setValue('')

    addMessage({
      name: user.name,
      time: new Date().toJSON(),
      text: value,
      avatar: 'https://s.gravatar.com/avatar/5240df899ccf11b1771b8737afada026?s=60',
    })
  }

  /**
   * Return a unique key for the given message.
   *
   * @param {import('../../../../declarations').IChatMessage} m
   */
  const messageKey = (m) => `${m.name}:${m.time}`

  return <div className="Chat">
    <div className="header"></div>
    <ul className="body">
      {
        // messages.map(msg => <ChatMessage key={messageKey(msg)} msg={msg} />)
      }
    </ul>
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
  messages: state.messages,
})

const mapDispatch = (dispatch) => ({
  addMessage: (msg) => dispatch(addMessage(msg))
})

export default connect(mapState, mapDispatch)(Chat)
