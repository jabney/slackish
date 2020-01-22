import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectRoom } from '../../store/actions'

import RoomItem from '../room-item/room-item.component'

import './rooms.component.scss'

/**
 * @type {React.FunctionComponent}
 */
const Rooms = ({ nsTitle, currentRoom, rooms, user, selectRoom }) => {
  const selected = (room) => room.title === currentRoom

  /**
   * Select a start rooom if a current room is not selected.
   */
  const selectStartRoom = () => {
    // Return early if the current room is set.
    if (currentRoom != null) { return }

    // If there are rooms, select one.
    if (rooms.length > 0) {
      // Only select a room if the user has been set.
      if (user != null) {
        selectRoom(rooms[0])
      }
    }
  }

  useEffect(selectStartRoom, [currentRoom, rooms, user])

  return <div className="Rooms">
    <h3>{nsTitle || 'Rooms'}</h3>
    <ul className='room-list'>
      {
        rooms.map(({ id, ...room }) => <RoomItem key={id}
          room={room}
          selected={selected(room)}
          onClick={selectRoom}
        />)
      }
    </ul>
  </div>
}

const mapState = (state) => {
  const namespace = state.namespace || {}

  return {
    nsTitle: namespace.title,
    currentRoom: namespace.currentRoom,
    rooms: namespace.rooms || [],
    user: state.user,
  }
}

const mapDispatch = (dispatch) => ({
  selectRoom: (room) => dispatch(selectRoom(room)),
})

export default connect(mapState, mapDispatch)(Rooms)
