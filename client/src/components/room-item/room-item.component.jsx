import React from 'react'
import { ReactComponent as Lock } from 'bootstrap-icons/icons/lock-fill.svg'
import { ReactComponent as Chat } from 'bootstrap-icons/icons/chat-fill.svg'
import './room-item.component.scss'

const RoomItem = ({ room, selected, onClick }) => (
  <div className={'RoomItem' + (selected ? ' selected' : '')} onClick={() => onClick(room)}>
    { room.isPrivate ? <Lock className='icon' /> : <Chat className='icon' /> }
    <span className='title'>{room.title}</span>
  </div>
)

export default RoomItem
