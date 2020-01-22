import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectRoom } from '../../store/actions'

import RoomItem from '../room-item/room-item.component'

import './rooms.component.scss'

/**
 * @type {React.FunctionComponent}
 */
const Rooms = ({ namespace, user, selectRoom }) => {
  const selected = (room) => room.title === namespace.currentRoom

  /**
   * Select a start rooom if a current room is not selected.
   */
  const selectStartRoom = () => {
    // Return early if the current room is set.
    if (namespace.currentRoom != null) { return }

    const { rooms } = namespace
    // If there are rooms, select one.
    if (Array.isArray(rooms) && rooms.length > 0) {
      // Only select a room if the user has been set.
      if (user != null) {
        selectRoom(namespace.rooms[0])
      }
    }
  }

  useEffect(selectStartRoom, [namespace, user])

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
  return {
    namespace: state.namespace || { rooms: [] },
    user: state.user,
  }
}

const mapDispatch = (dispatch) => ({
  selectRoom: (room) => dispatch(selectRoom(room)),
})

export default connect(mapState, mapDispatch)(Rooms)
