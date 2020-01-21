import React from 'react'
import { connect } from 'react-redux'
import { selectRoom } from '../../store/actions'

import RoomItem from '../room-item/room-item.component'

import './rooms.component.scss'

const Rooms = ({ namespace, selectRoom }) => {
  const selected = (room) => room.title === namespace.room

  return <div className="Rooms">
    <h3>{namespace.title || 'Rooms'}</h3>
    <ul className='room-list'>
      {
        namespace.rooms.map(({ id, ...room }) => <RoomItem key={id}
          room={room}
          selected={selected(room)}
          onClick={selectRoom}
        />)
      }
    </ul>
  </div>
}

const mapState = (state) => {
  const namespace = state.namespace || { rooms: [] }
  return { namespace }
}

const mapDispatch = (dispatch) => ({
  selectRoom: (room) => dispatch(selectRoom(room)),
})

export default connect(mapState, mapDispatch)(Rooms)
