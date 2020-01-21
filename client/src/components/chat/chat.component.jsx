import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../../store/actions'

import ChatMessage from '../chat-message/chat-message.component'

import './chat.component.scss'

/**
 * Chat panel component.
 */
const Chat = ({ messages, addMessage }) => {
  const [value, setValue] = useState('')

  /**
   * @param {React.FormEvent} e
   */
  const onSubmit = (e) => {
    e.preventDefault()
    if (value.length === 0) { return }
    setValue('')

    addMessage({
      name: 'jabney',
      time: new Date().toJSON(),
      text: value,
      avatar: '',
    })
  }

  const messageKey = (m) => `${m.name}:${m.time}`

  return <div className="Chat">
    <div className="header"></div>
    <div className="body">
      {
        messages.map(msg => <ChatMessage key={messageKey(msg)} {...msg} />)
      }
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
  messages: state.messages,
})

const mapDispatch = (dispatch) => ({
  addMessage: (msg) => dispatch(addMessage(msg))
})

export default connect(mapState, mapDispatch)(Chat)
