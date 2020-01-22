import React from 'react'
import './chat-message.component.scss'

/**
 * @type {import('react').FunctionComponent}
 */
const ChatMessage = ({ msg }) => {
  /**
   * Format datetime value.
   *
   * @param {number} epochMs
   */
  const fmtTime = (epochMs) => new Date(epochMs).toLocaleTimeString()

  return <li className="ChatMessage">
    <div className='avatar'>
      <img src={msg.avatar} alt={`${msg.name} avatar`} />
    </div>
    <div className='message'>
      <div className='user'>
        <span className='name'>{msg.name}</span>
        <span className='time'>{fmtTime(msg.time)}</span>
      </div>
      <div className='text'>{msg.text}</div>
    </div>
  </li>
}

export default ChatMessage
