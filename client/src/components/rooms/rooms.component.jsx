import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectRoom } from 'store/actions'

import RoomItem from 'components/room-item'

import './rooms.component.scss'

/**
 * @type {React.FunctionComponent}
 */
const Rooms = ({ nsTitle, currentRoom, rooms, user, selectRoom }) => {
  /**
   * @param {import('../../../../declarations').IRoom} room
   */
  const selected = (room) => room.title === currentRoom

  /**
   * Select a start rooom if a current room is not selected.
   */
  const selectStartRoom = () => {
    // Return early if no rooms or user.
    if (currentRoom.length > 0 || rooms.length === 0 || user == null) { return }
    // Select the first room in the list.
    const [firstRoom] = rooms
    selectRoom(firstRoom)
  }

  // Select a start room when all conditions are met.
  useEffect(selectStartRoom, [currentRoom, rooms, user])

  return <div className="Rooms">
    <h3>{nsTitle || 'Rooms'}</h3>
    <ul className='room-list'>
      {
        rooms.map(({ id, ...room }) => <RoomItem key={id}
          room={room}
          selected={selected}
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
    currentRoom: namespace.currentRoom || '',
    rooms: namespace.rooms || [],
    user: state.user,
  }
}

const mapDispatch = (dispatch) => ({
  selectRoom: (room) => dispatch(selectRoom(room)),
})

export default connect(mapState, mapDispatch)(Rooms)
