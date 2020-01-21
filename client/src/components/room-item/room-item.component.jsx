import React from 'react'
import { ReactComponent as Lock } from 'bootstrap-icons/icons/lock-fill.svg'
import { ReactComponent as Unlock } from 'bootstrap-icons/icons/unlock-fill.svg'
import './room-item.component.scss'

const RoomItem = ({ room, selected, onClick }) => (
  <div className={'RoomItem' + (selected ? ' selected' : '')} onClick={() => onClick()}>
    { room.isPrivate ? <Lock className='icon' /> : <Unlock className='icon' /> }
    <span className='title'>{room.title}</span>
  </div>
)

export default RoomItem
