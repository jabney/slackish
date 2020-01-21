import React from 'react'
import { connect } from 'react-redux'

import RoomItem from '../room-item/room-item.component'

import './rooms.component.scss'

const Rooms = ({ namespace }) => {
  const selected = (room) => {
    return room.title === namespace.room
  }
  return <div className="Rooms">
    {
      namespace.rooms.map(({ id, ...room }) => <RoomItem key={id}
        room={room}
        selected={selected(room)}
        onClick={() => console.log(room)}
      />)
    }
  </div>
}

const mapState = (state) => {
  const namespace = state.namespace || { rooms: [] }
  return { namespace }
}

const mapDispatch = (dispatch) => ({})

export default connect(mapState, mapDispatch)(Rooms)
