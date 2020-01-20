import React from 'react'
import { connect } from 'react-redux'

import './chat.component.scss'

const Chat = () => (
  <div className="Chat">Chat</div>
)

const mapState = () => ({})
const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(Chat)
